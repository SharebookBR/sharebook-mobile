import {Component} from '@angular/core';
import {App, IonicPage, NavController} from 'ionic-angular';
import {BookService} from "../../services/book/book.service";
import {Status} from "../../models/status";
import {Book} from "../../models/book";
import {User} from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  newBooks: Array<Book> = [];
  randomBooks: Array<Book> = [];

  newStatus = new Status();
  randomStatus = new Status();

  constructor(
    public app: App,
    public navCtrl: NavController,
    public bookService: BookService,
  ) {
    this.getTop15();
    this.getRandomBooks();
  }

  getTop15() {
    this.newStatus.setAsDownloading();
    this.bookService.getTop15NewBooks().subscribe((books) => {
      this.newStatus.setAsSuccess();
      this.newBooks = books;
    }, err => {
      this.newStatus.setAsError();
    })
  }

  getRandomBooks() {
    this.randomStatus.setAsDownloading();
    this.bookService.getRandom15Books().subscribe((books) => {
      this.randomStatus.setAsSuccess();
      this.randomBooks = books;
    }, err => {
      this.randomStatus.setAsError();
    })
  }

  openDetails(book) {
    this.app.getRootNav().push('BookDetailsPage', {book});
  }

  onImgLoadError(book) {
    book.imageUrl = 'assets/imgs/img-placeholder.png';
  }

  getShortName(user: User) {
    const names = user.name.split(' ');

    if (names.length > 1) {
      return `${names[0]} ${names[names.length-1]}`;
    }

    return names[0];
  }
}
