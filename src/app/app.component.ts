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
      {title: 'Meus pedidos', component: 'MyRequestsPage'},
      {title: 'Livros', component: 'HomePage'},
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

  setRootPage() {
    if (this.sessionService.user) {
      this.menuCtrl.enable(true);
      this.nav.setRoot('TabsPage');
    } else {
      this.nav.setRoot('LoginPage');
    }
  }
}
