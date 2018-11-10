import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SessionService} from "../services/session/session.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public sessionService: SessionService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.sessionService.restoreSession();
      this.statusBar.backgroundColorByHexString('#1f3b60');
      this.setRootPage();
      this.splashScreen.hide();
    });
  }

  setRootPage() {
    if (this.sessionService.user) {
      this.menuCtrl.enable(true);
      this.nav.setRoot('TabsPage');
    } else {
      this.nav.setRoot('LoginPage');
    }
  }
}
