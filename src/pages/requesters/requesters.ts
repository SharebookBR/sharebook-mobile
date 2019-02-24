import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {BookService} from "../../services/book/book.service";
import {Request} from '../../models/request';

@IonicPage()
@Component({
  selector: 'page-interessados',
  templateUrl: 'requesters.html',
})
export class InteressadosPage {
  bookId: string;
  requests: Array<Request>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bookService: BookService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
  ) {
    this.bookId = this.navParams.get('bookId');
  }

  ionViewWillEnter() {
    this.getInteressados();
  }

  getInteressados() {
    this.bookService.getRequestersList(this.bookId).subscribe(requests => {
      this.requests = <Request[]>requests;
    })
  }

  choose(request: Request) {
    const modal = this.modalCtrl.create('RequesterPickerPage', {request, bookId: this.bookId});

    modal.onDidDismiss((data) => {
      if (data && data.success) {
        this.toastCtrl.create({
          message: 'Livro doado com sucesso!',
          cssClass: 'toast-success',
          duration: 3000,
        }).present();

        this.navCtrl.pop();
      }
    });

    modal.present();
  }

  showErrorToast(msg) {
    this.toastCtrl.create({
      message: msg,
      cssClass: 'toast-error',
      duration: 3000,
    }).present();
  }
}
