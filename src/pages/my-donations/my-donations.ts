import {Component} from '@angular/core';
import {
  ActionSheetButton,
  ActionSheetController,
  AlertController,
  App,
  IonicPage,
  ModalController,
  NavController,
  ToastController,
} from 'ionic-angular';
import {BookService} from '../../services/book/book.service';
import {Status} from "../../models/status";
import {Book, getStatusColor, isCanceled, isDonated} from "../../models/book";
import {SessionService} from "../../services/session/session.service";
import {isAdmin, User} from "../../models/user";
import {getRemainingDays} from "../../core/utils/date";
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-my-donations',
  templateUrl: 'my-donations.html',
})
export class MyDonationsPage {

  user: User;
  donatedBooks: Array<Book> = [];
  dStatus = new Status();
  getRemainingDays = getRemainingDays;
  getStatusColor = getStatusColor;

  constructor(
    public navCtrl: NavController,
    private bookService: BookService,
    private sessionService: SessionService,
    private modalCtrl: ModalController,
    private app: App,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    this.user = this.sessionService.user;
  }

  ionViewWillEnter() {
    this.getDonatedBooks();
  }

  getDonatedBooks() {
    if (!this.dStatus.isSuccess()) {
      this.dStatus.setAsDownloading();
    }

    this.bookService.getDonatedBooks().subscribe(books => {
      this.dStatus.setAsSuccess();

      this.donatedBooks = books;
    }, err => {
      this.dStatus.setAsError();
    })
  }

  retry() {
    if (this.dStatus.isError()) {
      this.getDonatedBooks();
    }
  }

  isDownloading() {
    return this.dStatus.isDownloading();
  }

  isError() {
    return this.dStatus.isError();
  }

  isSuccess() {
    return this.dStatus.isSuccess();
  }

  isEmpty() {
    return this.donatedBooks.length === 0 && this.isSuccess();
  }

  editDonatedBook(book: Book) {
    const edit: ActionSheetButton = {
      text: 'Editar',
      icon: 'create',
      handler: () => {
        this.modalCtrl.create('DonatePage', {book}).present();
      }
    };

    const donator: ActionSheetButton = {
      text: 'Escolher destinatário',
      icon: 'trophy',
      handler: () => {
        if (this.canChooseDonator(book)) {
          this.app.getRootNav().push('InteressadosPage', {bookId: book.id});
        } else {
          this.alertCtrl.create({
            title: 'Fora da data de escolha',
            message: `Aguarde mais ${getRemainingDays(book.chooseDate)} dias para poder escolher. 😉`,
            buttons: ['Ok'],
          }).present();
        }
      }
    };

    const postpone: ActionSheetButton = {
      text: 'Renovar data de escolha',
      icon: 'calendar',
      handler: () => {
        this.alertCtrl.create({
          title: 'Atenção!',
          message: 'Confirma a renovação da data de doação?',
          buttons: [{
            text: 'Sim',
            handler: () => {
              this.renewDonation(book);
            }
          }, 'Não']
        }).present();
      }
    };

    const tracking: ActionSheetButton = {
      text: 'Informar código de rastreio',
      icon: 'mail',
      handler: () => {

      }
    };

    const buttons = [];

    if (this.isAdmin()) {
      buttons.push(edit);
    }

    // TODO falta implementar
    // if (isDonated(book)) {
    //   buttons.push(tracking);
    // }

    if (!isDonated(book) && !isCanceled(book)) {
      buttons.push(donator);
      buttons.push(postpone);
    }

    if (buttons.length) {
      this.actionSheetCtrl.create({
        title: 'Selecione uma das opções',
        buttons: buttons
      }).present();
    }
  }

  isAdmin(): boolean {
    return isAdmin(this.user);
  }

  donate() {
    this.modalCtrl
      .create('DonatePage')
      .present();
  }

  canChooseDonator(book: Book) {
    const chooseDate = new Date(book.chooseDate);
    const now = new Date();

    return !book.donated && now.getTime() > chooseDate.getTime();
  }

  renewDonation(book: Book) {
    this.bookService.renewChooseDate(book.id).timeout(10000).subscribe(data => {
      this.toastCtrl.create({
        message: 'Data renovada com sucesso!',
        cssClass: 'toast-success',
        duration: 3000,
      }).present();

      this.getDonatedBooks();
    }, err => {
      this.toastCtrl.create({
        message: 'Não foi possível renovar a data, tente novamente.',
        cssClass: 'toast-error',
        duration: 3000,
      }).present();
    })
  }
}
