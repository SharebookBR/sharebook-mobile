import {Component} from '@angular/core';
import {
  ActionSheetButton,
  ActionSheetController,
  AlertController,
  App,
  IonicPage,
  ModalController,
  NavController
} from 'ionic-angular';
import {BookService} from '../../services/book/book.service';
import {BookRequestStatus} from '../../models/BookRequestStatus';
import {Status} from "../../models/status";
import {Book, isDonated} from "../../models/book";
import {SessionService} from "../../services/session/session.service";
import {isAdmin, User} from "../../models/user";
import {getRemainingDays} from "../../core/utils/date";

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

  constructor(
    public navCtrl: NavController,
    private bookService: BookService,
    private sessionService: SessionService,
    private modalCtrl: ModalController,
    private app: App,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
  ) {
    this.user = this.sessionService.user;
  }

  ionViewWillEnter() {
    this.getDonatedBooks();
  }

  getBadgeStatusColor(status) {
    switch (status.toUpperCase()) {
      case BookRequestStatus.DONATED:
        return 'secondary';
      case BookRequestStatus.REFUSED:
        return 'danger';
      case BookRequestStatus.AWAITING_ACTION:
      case BookRequestStatus.AWAITING_APPROVAL:
        return 'primary-light';
      default:
        return 'primary';
    }
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

      if (err && err.status === 401) {
        // Token expired
        this.logout();
      }
    })
  }

  logout() {
    this.sessionService.clearSession();
    this.app.getRootNav().setRoot('LoginPage');
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

    if (isDonated(book)) {
      buttons.push(tracking);
    } else {
      buttons.push(donator);
      buttons.push(postpone);
    }

    this.actionSheetCtrl.create({
      title: 'Selecione uma das opções',
      buttons: buttons
    }).present();
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

    return now.getTime() > chooseDate.getTime();
  }
}
