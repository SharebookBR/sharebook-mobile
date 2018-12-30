import {Component} from '@angular/core';
import {ActionSheetController, App, IonicPage, ModalController, NavController} from 'ionic-angular';
import {BookService} from '../../services/book/book.service';
import {BookRequestStatus} from '../../models/BookRequestStatus';
import {Status} from "../../models/status";
import {Book} from "../../models/book";
import {SessionService} from "../../services/session/session.service";
import {isAdmin, User} from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-my-donations',
  templateUrl: 'my-donations.html',
})
export class MyDonationsPage {

  user: User;
  donatedBooks: Array<Book> = [];
  dStatus = new Status();

  constructor(
    public navCtrl: NavController,
    private bookService: BookService,
    private sessionService: SessionService,
    private modalCtrl: ModalController,
    private app: App,
    private actionSheetCtrl: ActionSheetController,
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

  // TODO make use of this after fixing backend
  editDonatedBook(book) {
    this.actionSheetCtrl.create({
      title: 'Selecione uma das opções',
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.modalCtrl.create('DonatePage', {book}).present();
        }
      }]
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
}
