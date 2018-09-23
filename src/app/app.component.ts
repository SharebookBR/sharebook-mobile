import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {MyRequestsPage} from '../pages/my-requests/my-requests';
import {SessionService} from "../services/session/session.service";
import { AppVersion } from '@ionic-native/app-version';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  version: string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public sessionService: SessionService,
    public appVersion: AppVersion,
  ) {
    this.initializeApp();

    this.pages = [
      {title: 'Home', component: 'HomePage'},
      {title: 'Meus pedidos', component: 'MyRequestsPage'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.sessionService.restoreSession();
      this.statusBar.backgroundColorByHexString('#1f3b60');
      this.setRootPage();
      this.getAppVersion();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  setRootPage() {
    if (this.sessionService.user) {
      this.menuCtrl.enable(true);
      this.nav.setRoot('HomePage');
    } else {
      this.nav.setRoot('LoginPage');
    }
  }

  getAppVersion() {
    this.appVersion.getVersionNumber().then((version) => {
      this.version = version;
    }, err => {
      // not running on cordova
    })
  }

  logout() {
    this.sessionService.clearSession();
    this.nav.setRoot('LoginPage');
  }
}
