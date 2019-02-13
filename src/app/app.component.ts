import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SessionService} from "../services/session/session.service";
import {OneSignal} from "@ionic-native/onesignal";

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
    public oneSignal: OneSignal,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.sessionService.restoreSession();
      this.statusBar.backgroundColorByHexString('#1f3b60');
      this.setRootPage();
      this.loadPushNotificationsConfig();
      this.splashScreen.hide();
    });
  }

  setRootPage() {
    const isTokenValid = this.isTokenValid(this.sessionService.data.expiration);

    if (this.sessionService.user && isTokenValid) {
      this.menuCtrl.enable(true);
      this.nav.setRoot('TabsPage');
    } else {
      this.nav.setRoot('LoginPage');
    }
  }

  isTokenValid(expiration): boolean {
    if (expiration) {
      const expireDate = new Date(expiration);
      const today = new Date();

      return expireDate.getTime() >= today.getTime();
    }

    return false;
  }

  loadPushNotificationsConfig() {
    if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
      this.oneSignal.startInit('6a87a746-9a45-4ecf-a869-911d3b3a75b9', 'sharebook-mobile');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe((pushNotification) => {
        console.log('notifications received = ', pushNotification);
      });

      this.oneSignal.handleNotificationOpened().subscribe((notification) => {
        console.log('notifications opened =', notification);
      });

      this.oneSignal.endInit();
    }
  }
}
