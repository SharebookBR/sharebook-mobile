import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Book} from "../../models/book";
import {UserService} from "../../services/user/user.service";
import {PhotoViewer} from "@ionic-native/photo-viewer";

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {
  book: Book;
  freightLabels = Book.freightLabels;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public photoViewer: PhotoViewer,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
  ) {
    this.book = this.navParams.get('book');
  }

  ionViewCanEnter() {
    return !!this.book;
  }

  ionViewDidLoad() {
    const { address } = this.book.user;

    if (address) {

      if (!address.city && address.postalCode) {
        this.getCity(address.postalCode);
      }
    } else {
      this.book.user.address = {};
    }
  }

  getCity(cep) {
    this.userService.consultarCEP(cep).subscribe(address => {
      const {localidade, uf} = <any>address;
      if (localidade && uf) {
        this.book.user.address.city = localidade;
        this.book.user.address.state = uf;
      }
    }, err => {

    })
  }

  openBookCover() {
    this.photoViewer.show(this.book.imageUrl);
  }

  openBookRequest() {
    const bookModal = this.modalCtrl.create('BookRequestPage', {
      book: this.book
    });

    const addressModal = this.modalCtrl.create('ConfirmAddressPage');

    bookModal.onDidDismiss((data) => {
      if (data && data.success) addressModal.present();
    });

    addressModal.onDidDismiss((data) => {
      if (!(data && data.preventToast)) {
        this.toastCtrl.create({
          message: 'Livro solicitado com sucesso!',
          cssClass: 'toast-success',
          duration: 3000,
        }).present();
      }
    });

    bookModal.present();
  }
}
