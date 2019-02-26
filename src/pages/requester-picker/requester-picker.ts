import { Component } from '@angular/core';
import {
  App,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ToastController, ViewController
} from 'ionic-angular';
import {BookService} from "../../services/book/book.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Request} from '../../models/request';
import {DonateBookUser} from "../../models/book";
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-requester-picker',
  templateUrl: 'requester-picker.html',
})
export class RequesterPickerPage {

  form: FormGroup;
  reason: AbstractControl;
  bookId: string;
  request: Request;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bookService: BookService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public app: App,
    public viewCtrl: ViewController,
  ) {
    this.bookId = this.navParams.get('bookId');
    this.request = this.navParams.get('request');

    this.form = this.formBuilder.group({
      reason: ['', Validators.compose([
        Validators.maxLength(500),
        Validators.minLength(10),
        Validators.required,
      ])]
    });

    this.reason = this.form.get('reason');
  }

  ionViewCanEnter() {
    return !!this.request && !!this.bookId;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.reason.markAsTouched();
      return;
    }

    const loading = this.loadingCtrl.create({
      content: 'Processando...',
      dismissOnPageChange: true
    });

    const toast = this.toastCtrl.create({
      duration: 3000,
    });

    const note = this.reason.value;
    const bookUser: DonateBookUser = {note, userId: this.request.userId};

    loading.present();
    this.bookService.donateBookUser(this.bookId, bookUser).timeout(10000).subscribe(resp => {
      if (resp.success) {
        this.dismiss({success: true});
      } else {
        toast.setCssClass('toast-error');
        toast.setMessage('Desculpa o incoveniente. Tivemos algum erro.');

        this.dismiss({success: false});
      }

      loading.dismiss();
      toast.present();
    }, err => {
      loading.dismiss();

      toast.setCssClass('toast-error');
      toast.setMessage('Não foi possível finalizar a doação.');
      toast.present();
    });
  }

  dismiss(data?) {
    this.viewCtrl.dismiss(data);
  }
}
