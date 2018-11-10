import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SessionService} from "../../services/session/session.service";
import {AppVersion} from "@ionic-native/app-version";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  version: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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

  logOut() {
    this.sessionService.clearSession();
    this.navCtrl.setRoot('LoginPage');
  }
}
