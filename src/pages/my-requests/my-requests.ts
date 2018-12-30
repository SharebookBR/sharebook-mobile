import {Component} from '@angular/core';
import {App, IonicPage, ModalController, NavController} from 'ionic-angular';
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
  rStatus = new Status();

  constructor(
    public navCtrl: NavController,
    private bookService: BookService,
    private sessionService: SessionService,
    private modalCtrl: ModalController,
    private app: App,
  ) {
    this.user = this.sessionService.user;
  }

  ionViewWillEnter() {
    this.getRequestedBooks();
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

  logout() {
    this.sessionService.clearSession();
    this.app.getRootNav().setRoot('LoginPage');
  }

  retry() {
    if (this.rStatus.isError()) {
      this.getRequestedBooks();
    }
  }

  isDownloading() {
    return this.rStatus.isDownloading();
  }

  isError() {
    return this.rStatus.isError();
  }

  isSuccess() {
    return this.rStatus.isSuccess();
  }

  isEmpty() {
    return this.requestedBooks.length === 0 && this.isSuccess();
  }

  isAdmin(): boolean {
    return isAdmin(this.user);
  }
}
