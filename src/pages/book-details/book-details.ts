import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Book} from "../../models/book";
import {UserService} from "../../services/user/user.service";
import {PhotoViewer, PhotoViewerOptions} from "@ionic-native/photo-viewer";

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {
  book: Book;
  city: string;
  freightLabels = Book.freightLabels;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public photoViewer: PhotoViewer,
  ) {
    this.book = this.navParams.get('book');
  }

  ionViewCanEnter() {
    return !!this.book;
  }

  ionViewWillEnter() {
    this.getCity(this.book.user.postalCode);
  }

  getCity(cep) {
    this.userService.consultarCEP(cep).subscribe(address => {
      this.city = `${address['localidade']}-${address['uf']}`;
    }, err => {

    })
  }

  openBookCover() {
    this.photoViewer.show(this.book.imageUrl);
  }
}
