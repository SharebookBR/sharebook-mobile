import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailPattern, phonePattern} from "../../core/utils/app.const";
import {SessionService} from "../../services/session/session.service";
import {User} from "../../models/user";
import {ContactUsService} from "../../services/contact-us/contact-us-service";
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
  recaptchaReactive: AbstractControl;

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

  resolved(captchaResponse: string) {
    this.recaptchaReactive.setValue(captchaResponse);
  }

  setupForm() {
    this.user = this.sessionService.user;

    this.form = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      email: ['',  [Validators.required, Validators.pattern(emailPattern)]],
      phone: ['', [Validators.pattern(phonePattern)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(512)]],
      recaptchaReactive: ['', Validators.required],
    });

    this.name = this.form.get('name');
    this.email = this.form.get('email');
    this.phone = this.form.get('phone');
    this.message = this.form.get('message');
    this.recaptchaReactive = this.form.get('recaptchaReactive');

    this.phone.valueChanges.subscribe(value => {
      this.phone.setValue(formatPhone(value), {emitEvent: false})
    });

    if (this.user) {
      this.name.setValue(this.user.name);
      this.email.setValue(this.user.email);

      this.name.disable();
      this.email.disable();
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.name.markAsTouched();
      this.email.markAsTouched();
      this.phone.markAsTouched();
      this.message.markAsTouched();
      this.recaptchaReactive.markAsTouched();
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

    const data = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      message: this.form.get('message').value,
      recaptchaReactive: this.form.get('recaptchaReactive').value,
    }

    loading.present();
    this.contactUsService.contactUs(data).timeout(10000).subscribe((resp) => {
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
