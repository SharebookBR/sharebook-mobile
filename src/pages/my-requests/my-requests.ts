import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BookService } from '../../services/book/book.service';
import { BookRequestStatus } from '../../models/BookRequestStatus';
import {Status} from "../../models/status";

@IonicPage()
@Component({
  selector: 'page-my-requests',
  templateUrl: 'my-requests.html',
})
export class MyRequestsPage {

  requestedBooks = [];
  status = new Status();

  constructor(
    public navCtrl: NavController, 
    private bookService: BookService,
  ) {
    this.getRequestedBooks();
  }

  getRequestedBooks() {
    this.status.setAsDownloading();

    this
      .bookService
      .getRequestedBooks(1, 100)
      .subscribe(resp => {
        this.status.setAsSuccess();

        this.requestedBooks = resp.items;
      }, err => {
        this.status.setAsError();
      });
  }

  getBadgeStatusColor(status) {
    switch (status.toUpperCase()) {
      case BookRequestStatus.DONATED:
        return 'secondary';
      case BookRequestStatus.REFUSED:
        return 'danger';
      default:
        return 'primary';
    }
  }
}
