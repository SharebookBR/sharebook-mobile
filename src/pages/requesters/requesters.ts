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
import {isDue, Book} from "../../models/book";
import {getRemainingDays} from "../../core/utils/date";
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-interessados',
  templateUrl: 'requesters.html',
})
export class InteressadosPage {
  book: Book;
  donated: boolean;
  requests: Array<Request> = [];
  status = new Status();
  isBookDue: boolean;
  remainingDays: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bookService: BookService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public events: Events,
  ) {
    this.book = this.navParams.get('book');
  }

  ionViewCanEnter() {
    return this.book;
  }

  ionViewDidLoad() {
    this.donated = this.book.donated;
    this.isBookDue = isDue(this.book);
    this.remainingDays = getRemainingDays(this.book.chooseDate);
    this.getInteressados();
  }

  getInteressados() {
    if (!this.status.isSuccess()) {
      this.status.setAsDownloading();
    }

    this.bookService.getRequestersList(this.book.id).timeout(10000).subscribe(requests => {
      this.status.setAsSuccess();
      this.requests = <Request[]>requests;
    }, err => {
      this.status.setAsError();
    })
  }

  handleRequestClick(request: Request) {
    const toast = this.toastCtrl.create({
      duration: 3000,
    });

    if (this.donated) {
      toast.setMessage('Este livro já foi doado.')
      toast.present();
    } else if (!this.isBookDue) {
      toast.setMessage('Aguarde a data da decisão...')
      toast.present();
    } else {
      this.choose(request);
    }
  }

  choose(request: Request) {
    const modal = this.modalCtrl.create('RequesterPickerPage', {request, bookId: this.book.id});

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
