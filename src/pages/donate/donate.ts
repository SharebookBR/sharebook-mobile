import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, AbstractControl, Validators, FormGroup} from "@angular/forms";
import {Book} from "../../models/book";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../models/category";
import {Camera, CameraOptions} from '@ionic-native/camera';
import "rxjs/add/operator/retry";
import "rxjs/add/operator/timeout";
import {SessionService} from "../../services/session/session.service";
import {BookService} from "../../services/book/book.service";

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {

  freightOptions;
  categories: Array<Category>;

  // Form
  form: FormGroup;
  title: AbstractControl;
  author: AbstractControl;
  categoryId: AbstractControl;
  freightOption: AbstractControl;
  imageBytes: AbstractControl;
  synopsis: AbstractControl;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private sessionService: SessionService,
    private bookService: BookService,
  ) {
    this.getCategories();
    this.setupForm();
  }

  getCategories() {
    this.categoryService.getAll()
      .retry(3)
      .timeout(10000)
      .subscribe(categories => {
        this.categories = categories;
      }, err => {

      })
  }

  setupForm() {
    this.freightOptions = Object.keys(Book.freightLabels)
      .map(value => {
        return {value, text: Book.freightLabels[value]}
      });

    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      categoryId: ['', [Validators.required]],
      freightOption: ['', [Validators.required]],
      imageBytes: ['', [Validators.required]],
      synopsis: ['', [Validators.maxLength(2000)]],
    });

    this.title = this.form.get('title');
    this.author = this.form.get('author');
    this.categoryId = this.form.get('categoryId');
    this.freightOption = this.form.get('freightOption');
    this.imageBytes = this.form.get('imageBytes');
    this.synopsis = this.form.get('synopsis');
  }

  attach() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.form.get('imageBytes').setValue(imageData);
    }, (err) => {

    });
  }

  submit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(value => {
        this.form.get(value).markAsTouched();
      });

      return;
    }

    const filename = this.title.value.split(/ /i).join('-');

    const data:any = {
      title: this.title.value,
      author: this.author.value,
      categoryId: this.categoryId.value,
      freightOption: this.freightOption.value,
      synopsis: this.synopsis.value,
      imageName: `${filename}.jpeg`,
      imageBytes: this.imageBytes.value,
      userId: this.sessionService.user.userId
    };

    const loading = this.loadingCtrl.create({
      content: 'Enviando... <3',
    });

    const errorToast = this.toastCtrl.create({
      message: 'Erro ao enviar formulário, tente novamente',
      cssClass: 'toast-error',
      duration: 3000
    });

    const successToast = this.toastCtrl.create({
      message: 'Livro criado com sucesso! ♥',
      cssClass: 'toast-success',
      duration: 3000
    });

    loading.present();
    this.bookService.create(data).subscribe(resp => {
      if (resp.success === false) {
        loading.dismiss();
        errorToast.present();
      } else {
        loading.dismiss();
        successToast.present();

        this.navCtrl.pop();
      }
    }, err => {
      loading.dismiss();
      errorToast.present();
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
