import {Component, Inject} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  MenuController, ModalController,
  NavController,
  ToastController
} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../models/status";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import * as AppConst from "../../core/utils/app.const";
import {UserService} from "../../services/user/user.service";
import {Storage} from "@ionic/storage";

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
    public formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public userService: UserService,
    public modalCtrl: ModalController,
    @Inject(Storage) public storage: Storage
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(AppConst.emailPattern)]],
      password: ['', [Validators.required]],
    });

    this.email = this.form.get('email');
    this.password = this.form.get('password');

    this.restoreLastEmail();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async restoreLastEmail() {
    const email = await this.storage.get('lastEmail');

    if (email) {
      this.email.setValue(email);
    }
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
      this.navCtrl.setRoot('TabsPage');
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

  forgotPassword() {
    const alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [{
        name: 'email',
        placeholder: 'E-mail',
        value: this.form.get('email').value
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Resetar',
        handler: data => {
          const patt = new RegExp(AppConst.emailPattern);

          const success = this.toastCtrl.create({
            message: 'Sucesso, verifique seu e-mail.',
            duration: 2500,
            cssClass: 'toast-success'
          });

          const error = this.toastCtrl.create({
            message: 'E-mail inválido',
            duration: 2500,
            cssClass: 'toast-error'
          });

          const loading = this.loadingCtrl.create({
            content: 'Processando'
          });

          const email = data.email.toLowerCase();

          if (patt.test(email)) {
            loading.present();

            this.userService.forgotPassword(email).subscribe(resp => {
              loading.dismiss();

              success.present();
            }, err => {
              loading.dismiss();

              error.setMessage('Erro ao processar, tente novamente');
              error.present();
            });
          } else {
            error.setMessage('E-mail inválido');
            error.present();
          }
        }
      }]
    });

    alert.present();
  }

  contactUs() {
    this.modalCtrl.create('ContactUsPage').present();
  }
}

