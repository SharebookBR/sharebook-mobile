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
import {Book, getStatusColor, isAvailable, isDonated, isDue} from "../../models/book";
import {SessionService} from "../../services/session/session.service";
import {isAdmin, User} from "../../models/user";
import {getRemainingDays} from "../../core/utils/date";
import 'rxjs/add/operator/timeout';
import {Events} from 'ionic-angular';

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
  showFireworks: boolean;

  constructor(
    public navCtrl: NavController,
    private bookService: BookService,
    private sessionService: SessionService,
    private modalCtrl: ModalController,
    private app: App,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private events: Events,
  ) {
    this.user = this.sessionService.user;
  }

  ionViewDidLoad() {
    this.events.subscribe('fireworks', () => {
      this.triggerFireworks();
    })
  }

  ionViewWillUnload() {
    this.events.unsubscribe('fireworks')
  }

  ionViewWillEnter() {
    this.getDonatedBooks();
  }

  triggerFireworks() {
    const audio = new Audio('assets/sounds/fireworks.mp3');
    audio.play();

    this.showFireworks = true;

    setTimeout(() => {
      this.showFireworks = false;
    }, 10000)
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
      text: 'Editar (Admin)',
      icon: 'create',
      handler: () => {
        this.modalCtrl.create('DonatePage', {book}).present();
      }
    };

    const donator: ActionSheetButton = {
      text: 'Ver interessados',
      icon: 'list',
      handler: () => {
        this.app.getRootNav().push('InteressadosPage', {
          bookId: book.id,
          donated: book.donated,
        });
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
        this.requestTrackingNumber(book)
      }
    };

    const buttons = [];

    if (this.isAdmin()) {
      buttons.push(edit);
    }

    if (isDonated(book)) {
      buttons.push(tracking);
    }

    if (isAvailable(book)) {
      buttons.push(postpone);
    }

    buttons.push(donator);

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

  canChooseDonator (book: Book) {
    return isDue(book)
  }

  renewDonation(book: Book) {
    this.bookService.renewChooseDate(book.id).timeout(10000).subscribe(data => {
      this.successToast('Data renovada com sucesso!');
      this.getDonatedBooks();
    }, err => {
      this.errorToast('Não foi possível renovar a data, tente novamente.');
    })
  }

  requestTrackingNumber(book: Book) {
    const alert = this.alertCtrl.create({
      title: 'Código de rastreio',
      message: 'Adicione o código abaixo',
      buttons: [{
        text: 'Adicionar',
        handler: (data) => {
          const {trackingNumber} = data;

          if (trackingNumber.trim()) {
            this.setTrackingNumber(book, trackingNumber);
          } else {
            this.errorToast('Necessário adicionar código de rastreio.');
          }
        }
      }, 'Cancelar']
    });

    alert.addInput({
      placeholder: 'Código de rastreio',
      value: '',
      type: 'text',
      name: 'trackingNumber',
    });

    alert.present();
  }

  setTrackingNumber(book: Book, trackingNumber) {
    this.bookService.setTrackingNumber(book.id, {trackingNumber}).timeout(10000).subscribe(data => {
      this.successToast('Código adicionado com sucesso!');

      this.getDonatedBooks();
    }, err => {
      this.errorToast('Não foi possível adicionar o código');
    })
  }

  successToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      cssClass: 'toast-success',
      duration: 3000,
    }).present();
  }

  errorToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      cssClass: 'toast-error',
      duration: 3000,
    }).present();
  }
}
