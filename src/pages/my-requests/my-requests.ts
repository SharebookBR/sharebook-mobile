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
  selector: 'page-my-requests',
  templateUrl: 'my-requests.html',
})
export class MyRequestsPage {

  user: User;
  requestedBooks: Array<Book> = [];
  donatedBooks: Array<Book> = [];
  rStatus = new Status();
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
    this.getRequestedBooks();
    this.getDonatedBooks();
  }

  getRequestedBooks() {
    if (!this.rStatus.isSuccess()) {
      this.rStatus.setAsDownloading();
    }

    this
      .bookService
      .getRequestedBooks(1, 100)
      .subscribe(resp => {
        this.rStatus.setAsSuccess();

        this.requestedBooks = resp.items;
      }, err => {
        this.rStatus.setAsError();
      });
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

  donate() {
    const modal = this.modalCtrl.create('DonatePage');
    modal.present();
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

    if (this.rStatus.isError()) {
      this.getRequestedBooks();
    }
  }

  isDownloading() {
    return this.rStatus.isDownloading() || this.dStatus.isDownloading();
  }

  isError() {
    return this.rStatus.isError() || this.dStatus.isError();
  }

  isSuccess() {
    return this.rStatus.isSuccess() && this.dStatus.isSuccess();
  }

  isEmpty() {
    return this.requestedBooks.length === 0
      && this.donatedBooks.length === 0 && this.isSuccess();
  }

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
}
