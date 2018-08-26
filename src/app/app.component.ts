import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {SessionService} from "../services/session/session.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public sessionService: SessionService,
  ) {
    this.initializeApp();

    this.pages = [
      {title: 'Home', component: 'HomePage'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.sessionService.restoreSession();
      this.statusBar.backgroundColorByHexString('#1f3b60');
      this.setRootPage();
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

  logout() {
    this.sessionService.clearSession();
    this.nav.setRoot('LoginPage');
  }
}
