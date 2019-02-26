import { Component } from '@angular/core';
import {
  Events,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {BookService} from "../../services/book/book.service";
import {Request} from '../../models/request';
import {Status} from "../../models/status";
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-interessados',
  templateUrl: 'requesters.html',
})
export class InteressadosPage {
  bookId: string;
  requests: Array<Request> = [];
  status = new Status();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bookService: BookService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    this.bookId = this.navParams.get('bookId');
  }

  ionViewWillEnter() {
    this.getInteressados();
  }

  getInteressados() {
    if (!this.status.isSuccess()) {
      this.status.setAsDownloading();
    }

    this.bookService.getRequestersList(this.bookId).timeout(10000).subscribe(requests => {
      this.status.setAsSuccess();
      this.requests = <Request[]>requests;
    }, err => {
      this.status.setAsError();
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

        this.navCtrl.pop().then(() => {
          this.events.publish('fireworks');
        })
      }
    });

    modal.present();
  }

  isEmpty() {
    return this.requests.length === 0 && this.status.isSuccess();
  }
}
