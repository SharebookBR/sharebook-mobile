import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BookService } from '../../services/book/book.service';
import { BookRequestStatus } from '../../models/BookRequestStatus';

/**
 * Generated class for the MyRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-requests',
  templateUrl: 'my-requests.html',
})
export class MyRequestsPage {

  requestedBooks = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bookService: BookService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present();

    this
      .bookService
      .getRequestedBooks()
      .subscribe(resp => {
        this.requestedBooks = resp;
        loader.dismiss();
      }, err => {
        loader.dismiss();

        const toast = this.toastCtrl.create({
          message: 'Erro ao carregar os livros solicitados!',
          duration: 3000
        });

        toast.present();
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
