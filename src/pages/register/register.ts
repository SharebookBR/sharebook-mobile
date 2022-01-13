import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  MenuController, ModalController,
  NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as AppConst from '../../core/utils/app.const';
import {PasswordValidation} from "../../core/utils/passwordValidation";
import {UserService} from "../../services/user/user.service";
import {formatCep, formatPhone} from "../../core/utils/formatters";
import 'rxjs/add/operator/timeout';
import {User} from "../../models/user";
import {SessionService} from "../../services/session/session.service";

@IonicPage({
  defaultHistory: ['LoginPage']
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  form: FormGroup;
  isEditing: boolean;
  showAddressForm: boolean;

  constructor(public navCtrl: NavController,
              private userService: UserService,
              private toastController: ToastController,
              private menuController: MenuController,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private navParams: NavParams,
              private sessionService: SessionService,
              private modalCtrl: ModalController,
              private formBuilder: FormBuilder) {

    this.isEditing = this.navParams.get('isEditing');

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      age: [null, this.isEditing ? undefined : [Validators.required, Validators.min(8), Validators.max(100)]],
      parentEmail: [''],
      email: ['', [Validators.required, Validators.pattern(AppConst.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(AppConst.phonePattern)]],
      linkedin: ['', [Validators.pattern(AppConst.linkedInUrlPattern)]],
      postalCode: ['', [Validators.required, Validators.pattern(AppConst.postalCodePattern)]],
      street: ['', [Validators.required]],
      number: [null, [Validators.required]],
      complement: [''],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      terms: [this.isEditing, [Validators.requiredTrue]],
      allowSendingEmail: [false],
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

    postalCodeControl.statusChanges.subscribe(validity => {
      if (validity === 'VALID') {
        this.showAddressForm = true;

        if (!postalCodeControl.pristine) {
          this.getAddress(postalCodeControl.value);
        }
      }
    });

    if (this.isEditing) {
      this.form.get('password').setValidators([]);
      this.form.get('confirmPassword').setValidators([]);

      this.loadUser();
    }
  }

  loadUser() {
    const loading = this.loadingController.create({
      content: 'Carregando...'
    });

    loading.present();
    this.userService.getUserData().timeout(15000).subscribe(user => {
      loading.dismiss();

      this.setUserData(user);
    }, err => {
      loading.dismiss();
    })
  }

  setUserData(user) {
    this.form.get('name').setValue(user.name);
    this.form.get('email').setValue(user.email);
    this.form.get('phone').setValue(user.phone);
    this.form.get('linkedin').setValue(user.linkedin);
    this.form.get('postalCode').setValue(user.address.postalCode);
    this.form.get('street').setValue(user.address.street);
    this.form.get('number').setValue(user.address.number);
    this.form.get('complement').setValue(user.address.complement);
    this.form.get('neighborhood').setValue(user.address.neighborhood);
    this.form.get('city').setValue(user.address.city);
    this.form.get('state').setValue(user.address.state);
    this.form.get('country').setValue(user.address.country);
    this.form.get('allowSendingEmail').setValue(user.allowSendingEmail);
  }

  getAddress(cep) {
    this.userService.consultarCEP(cep).subscribe(address => {
      const {localidade, uf, bairro, logradouro, erro} = <any>address;

      if (erro) {
        this.clearAddress();
      } else {
        this.form.get('street').setValue(logradouro);
        this.form.get('neighborhood').setValue(bairro);
        this.form.get('city').setValue(localidade);
        this.form.get('state').setValue(uf);
        this.form.get('country').setValue('Brasil');
      }
    }, err => {
      this.clearAddress();
    })
  }

  clearAddress() {
    this.form.get('street').setValue('');
    this.form.get('neighborhood').setValue('');
    this.form.get('city').setValue('');
    this.form.get('state').setValue('');
    this.form.get('country').setValue('');
  }

  askForParentEmail() {
    this.alertController.create({
      title: 'Só mais um detalhe...',
      message: 'Por você ser menor de 12 anos, precisamos que nos forneça o e-mail de um dos seus pais.',
      inputs: [{
        id: 'email',
        name: 'email',
        type: 'text',
        placeholder: 'E-mail',
      }],
      buttons: ['Cancelar', {
        text: 'Inserir',
        handler: ({ email }) => {
          if (new RegExp(AppConst.emailPattern).test(email)) {
            this.form.get('parentEmail').setValue(email);
            this.submit(this.form.value);
          } else {
            this.alertController.create({
              message: 'E-mail inválido, tente novamente!',
              buttons: ['Ok'],
            }).present();
          }
        },
      }]
    }).present();
  }

  submit(values) {
    if (this.form.valid) {
      const age = this.form.get('age').value;
      if (age && age < 12 && !this.form.get('parentEmail').value) {
        this.askForParentEmail();
        return;
      }

      this.isEditing ?
        this.update(values) :
        this.create(values);
    } else {
      for (const key of Object.keys(this.form.controls)) {
        this.form.get(key).markAsTouched();
      }
      this.toastController.create({message: 'Preencha todos os campos obrigatórios', duration: 2500}).present();
    }
  }

  create(values) {
    const loading = this.loadingController.create({
      content: 'Processando'
    });

    loading.present();
    this.userService.register(values).subscribe(
      data => {
        loading.dismiss();

        if (data.authenticated) {
          this.menuController.enable(true);
          this.navCtrl.setRoot('TabsPage');
        } if (data.success) {
          this.navCtrl.setRoot('LoginPage').then(() => {
            if (data.successMessage) {
              this.alertController.create({
                title: 'Importante!',
                message: data.successMessage,
                buttons: ['Ok!'],
              }).present();
            }
          });
        } else {
          const alert = this.alertController.create();
          alert.setTitle('Ops...');
          alert.setMessage(data.messages[0]);
          alert.addButton('Ok');
          alert.present();
        }
      },
      err => {
        loading.dismiss();
        this.onRequestError(err.error);
      }
    );
  }

  update(values) {
    const loading = this.loadingController.create({
      content: 'Processando'
    });

    loading.present();
    const user: User = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      linkedin: values.linkedin,
      allowSendingEmail: values.allowSendingEmail,
      address: {
        street: values.street,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        postalCode: values.postalCode,
        city: values.city,
        country: values.country,
        state: values.state,
      }
    };

    this.userService.update(user).subscribe(
      user => {
        loading.dismiss();

        this.sessionService.user.name = user.name;
        this.sessionService.user.email = user.email;

        this.navCtrl.pop();
      },
      err => {
        loading.dismiss();
        this.onRequestError(err.error);
      }
    );
  }

  onRequestError(error) {
    const msg = error && error.messages && error.messages[0] ?
      error.messages[0] :
      `Não foi possível ${this.isEditing ? 'atualizar seus dados' : 'criar seu usuário'}, tente novamente.`;

    const alert = this.alertController.create();
    alert.setTitle('Ops...');
    alert.setMessage(msg);
    alert.addButton('Ok');
    alert.present();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  openTerms() {
    this.modalCtrl.create('TermsPage').present();
  }
}
