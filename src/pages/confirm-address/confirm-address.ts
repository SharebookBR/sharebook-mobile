import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import "rxjs/add/operator/timeout";

@IonicPage()
@Component({
  selector: 'page-confirm-address',
  templateUrl: 'confirm-address.html',
})
export class ConfirmAddressPage {
  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
  ) {

  }

  ionViewWillEnter() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserData().timeout(10000).subscribe(user => {
      this.user = user;
    }, err => {
      this.navCtrl.pop();
      this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Seu livro foi solicitado com sucesso, porém não foi possível confirmar seu endereço. Gostaria de verificá-lo agora?',
        buttons: ['Não', {
          text: 'Sim',
          handler: () => {
            this.navCtrl.push('RegisterPage', {
              isEditing: true
            });
          }
        }]
      }).present();
    })
  }

  updateAddress() {
    this.navCtrl.push('RegisterPage', {isEditing: true});
  }

  dismiss(data?) {
    this.viewCtrl.dismiss(data);
  }
}
