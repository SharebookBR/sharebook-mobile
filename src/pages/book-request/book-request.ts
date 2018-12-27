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
import {Book} from "../../models/book";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-book-request',
  templateUrl: 'book-request.html',
})
export class BookRequestPage {

  form: FormGroup;
  reason: AbstractControl;
  book: Book;

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
    this.book = this.navParams.get('book');

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
    return !!this.book;
  }

  requestBook() {
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

    const reason = this.reason.value;

    loading.present();
    this.bookService.requestBook(this.book.id, reason).subscribe(resp => {
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
      toast.setMessage('Não foi possível solicitar este livro.');
      toast.present();
    });
  }

  dismiss(data?) {
    this.viewCtrl.dismiss(data);
  }
}
