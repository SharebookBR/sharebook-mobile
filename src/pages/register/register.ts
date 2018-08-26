import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../models/status";
import * as AppConst from '../../core/utils/app.const';
import {PasswordValidation} from "../../core/utils/passwordValidation";
import {UserService} from "../../services/user/user.service";
import {formatCep, formatPhone} from "../../core/utils/formatters";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  form: FormGroup;

  constructor(public navCtrl: NavController,
              private userService: UserService,
              private toastController: ToastController,
              public navParams: NavParams,
              private alertController: AlertController,
              private _formBuilder: FormBuilder) {

    this.form = _formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(AppConst.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(AppConst.passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.pattern(AppConst.phonePattern)]],
      linkedin: ['', [Validators.pattern(AppConst.linkedInUrlPattern)]],
      postalCode: ['', [Validators.required, Validators.pattern(AppConst.postalCodePattern)]]
    }, {
      validator: PasswordValidation.MatchPassword
    });

    const phoneControl = this.form.get('phone');
    phoneControl.valueChanges.subscribe(value => {
      phoneControl.setValue(formatPhone(value), {emitEvent: false})
    });

    const postalCodeControl = this.form.get('postalCode');
    postalCodeControl.valueChanges.subscribe(value => {
      postalCodeControl.setValue(formatCep(value), {emitEvent: false})
    });
  }

  submit(values) {
    console.log(values)
    if (Math.random) return;

    if (this.form.valid) {
      this.userService.register(values).subscribe(
        data => {
          if (data.success || data.authenticated) {
            this.navCtrl.setRoot('HomePage');
          } else {
            const alert = this.alertController.create();
            alert.setTitle('Ops...');
            alert.setMessage(data.messages[0]);
            alert.addButton('Ok');
            alert.present();
          }
        },
        error => {
          const alert = this.alertController.create();
          alert.setTitle('Ops...');
          alert.setMessage('Não foi possível efetuar seu registro. Verifique sua conexão e tente novamente');
          alert.addButton('Ok');
          alert.present();
        }
      );
    } else {
      for (const key of Object.keys(this.form.controls)) {
        this.form.get(key).markAsTouched();
      }
      this.toastController.create({message: 'Preencha todos os campos obrigatórios', duration: 2500}).present();
    }
  }


}
