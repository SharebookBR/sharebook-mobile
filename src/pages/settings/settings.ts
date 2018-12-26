import {Component} from '@angular/core';
import {App, IonicPage} from 'ionic-angular';
import {SessionService} from "../../services/session/session.service";
import {AppVersion} from "@ionic-native/app-version";
import {instagramUrl, linkedinUrl} from "../../core/utils/app.const";

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
  ) {
    this.getAppVersion();
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


  logOut() {
    this.sessionService.clearSession();
    this.app.getRootNav().setRoot('LoginPage');
  }
}
