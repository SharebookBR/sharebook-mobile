import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailPattern, phonePattern} from "../../core/utils/app.const";
import {SessionService} from "../../services/session/session.service";
import {User} from "../../models/user";
import {ContactUsService} from "../../providers/contact-us/contact-us-service";
import {formatPhone} from "../../core/utils/formatters";
import 'rxjs/add/operator/timeout';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  user: User;

  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  message: AbstractControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public sessionService: SessionService,
    public contactUsService: ContactUsService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
    this.setupForm();
  }

  setupForm() {
    this.user = this.sessionService.user;

    this.form = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      email: ['',  [Validators.required, Validators.pattern(emailPattern)]],
      phone: ['', [Validators.pattern(phonePattern)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(512)]],
    });

    this.name = this.form.get('name');
    this.email = this.form.get('email');
    this.phone = this.form.get('phone');
    this.message = this.form.get('message');

    this.phone.valueChanges.subscribe(value => {
      this.phone.setValue(formatPhone(value), {emitEvent: false})
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.name.markAsTouched();
      this.email.markAsTouched();
      this.phone.markAsTouched();
      this.message.markAsTouched();
      return;
    }

    const successToast = {
      message: 'Mensagem enviada com sucesso!',
      duration: 3000,
      cssClass: 'toast-success'
    };

    const errorToast = {
      message: 'Erro ao enviar mensagem, tente novamente',
      duration: 3000,
      cssClass: 'toast-error'
    };

    const loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });

    loading.present();
    this.contactUsService.contactUs(this.form.value).timeout(10000).subscribe((resp) => {
      loading.dismiss();

      if (resp && resp.success) {
        this.toastCtrl.create(successToast).present();
        this.dismiss();
      } else if (resp && resp.messages && resp.messages.length) {
        this.alertCtrl.create({
          title: 'Problema ao enviar',
          message: resp.messages.join('<br>'),
          buttons: ['Ok']
        }).present();
      } else {
        this.toastCtrl.create(errorToast).present();
      }
    }, err => {
      loading.dismiss();
      this.toastCtrl.create(errorToast).present();
    })
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
