import { Component, ViewChild, } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar, App } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../models/book';
import { Status } from '../../models/status';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild('searchbar') searchbar: Searchbar;
  BOOKS_LIMIT_PER_REQUEST = 15;
  searchInput = new FormControl();
  books: Book[] = [];
  status = new Status();

  constructor(
    public app: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public bookService: BookService,
  ) {
    this.searchInput
      .valueChanges
      .debounceTime(500)
      .subscribe(() => {
      this.books = [];
      this.searchForBooks();
    })
  }
  
  searchForBooks(event?) {
    if (this.books.length) {
      this.status.setAsRefreshing();
    } else {
      this.status.setAsDownloading();
    }

    const page = 1 + this.books.length / this.BOOKS_LIMIT_PER_REQUEST;
    this.bookService.getFullSearch(this.searchInput.value, page, this.BOOKS_LIMIT_PER_REQUEST).subscribe(({items}) => {
      this.status.setAsSuccess();
      this.books = this.books.concat(items);

      if (event) {
        event.complete();
      }
    }, err => {
      this.status.setAsError();
    })
  }

  ionViewDidLoad() {
    this.searchbar.setFocus();
  }

  openDetails(book) {
    this.app.getRootNav().push('BookDetailsPage', {book});
  }

  onImgLoadError(book) {
    book.imageUrl = 'assets/imgs/img-placeholder.png';
  }
}
