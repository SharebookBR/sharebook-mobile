import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/book';
import { Status } from '../../models/status';
import { User } from '../../models/user';
import { BookService } from '../../services/book/book.service';

@IonicPage()
@Component({
  selector: 'page-winner',
  templateUrl: 'winner.html',
})
export class WinnerPage {
  winner: User;
  book: Book;
  status = new Status();
  error;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bookService: BookService,
  ) {
    this.book = this.navParams.get('book');
  }

  ionViewDidLoad() {
    this.getMainUsers();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  getMainUsers() {
    this.status.setAsDownloading();
    this.bookService.getMainUsers(this.book.id).subscribe(({ winner }) => {
      this.winner = winner;
      this.status.setAsSuccess();
    }, ({ error }) => {
      this.error = error;
      this.status.setAsError();
    })
  }
}
