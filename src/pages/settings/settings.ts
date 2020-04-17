import {Component} from '@angular/core';
import {App, IonicPage, ModalController} from 'ionic-angular';
import {SessionService} from "../../services/session/session.service";
import {AppVersion} from "@ionic-native/app-version";
import {facebookUrl, instagramUrl, linkedinUrl, quemSomosUrl} from "../../core/utils/app.const";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  version: string;

  constructor(
    public app: App,
    public sessionService: SessionService,
    public appVersion: AppVersion,
    public modalCtrl: ModalController,
  ) {
    this.getAppVersion();
  }

  openSearchPage() {
    this.app.getRootNav().push('SearchPage');
  }

  getAppVersion() {
    this.appVersion.getVersionNumber().then((version) => {
      this.version = version;
    }, err => {
      // not running on cordova
    })
  }

  edit() {
    this.app.getRootNav().push('RegisterPage', {
      isEditing: true
    });
  }

  openInstagram() {
    window.open(instagramUrl, '_blank');
  }

  openLinkedin() {
    window.open(linkedinUrl, '_blank');
  }

  openFacebook() {
    window.open(facebookUrl, '_blank');
  }

  openQuemSomos() {
    window.open(quemSomosUrl, '_blank');
  }

  contactUs() {
    this.modalCtrl.create('ContactUsPage').present();
  }

  logOut() {
    this.sessionService.clearSession();
    this.app.getRootNav().setRoot('LoginPage');
  }

  openTerms() {
    this.modalCtrl.create('TermsPage').present();
  }
}
