import {Component} from '@angular/core';
import {IonicPage, LoadingController, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../models/status";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import * as AppConst from "../../core/utils/app.const";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  status = new Status();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(AppConst.emailPattern)]],
      password: ['', [Validators.required]],
    });

    this.email = this.form.get('email');
    this.password = this.form.get('password');
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login() {
    if (this.form.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    const loading = this.loadingCtrl.create({
      content: 'Entrando...'
    });

    loading.present();
    this.authService.login(this.email.value, this.password.value).subscribe(data => {
      loading.dismiss();

      this.menuCtrl.enable(true);
      this.navCtrl.setRoot('HomePage');
    }, err => {
      loading.dismiss();
      this.toastCtrl.create({
        message: 'E-mail e/ou senha inválido',
        duration: 2500
      }).present();
    })
  }

  cadastrar() {
    this.navCtrl.push('RegisterPage');
  }
}

