import {Component} from '@angular/core';
import {IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../models/status";
import {AuthenticationService} from "../../services/authentication/authentication.service";

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
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50)])],
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
      this.status.setAsSuccess();
      console.log(data);
      loading.dismiss();

      this.menuCtrl.enable(true);
      this.navCtrl.setRoot('HomePage');
    }, err => {
      console.log(err);
      loading.dismiss();
      this.status.setAsError();
    })
  }

  cadastrar() {

  }
}

