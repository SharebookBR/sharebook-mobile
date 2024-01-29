import { Injectable } from '@angular/core';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {Platform} from "ionic-angular";
import {config} from '../../../environments/environment';

@Injectable()
export class OneSignalService {

  constructor(
    public oneSignal: OneSignal,
    public platform: Platform,
  ) {

  }

  loadConfig() {
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

      this.oneSignal.sendTag('env', config.name)
    }
  }

  sendOneSignalTags(user: {id: string, name: string, email: string}) {
    if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
      this.oneSignal.sendTags(user);
    }
  }

  deleteOneSignalTags() {
    if (!(this.platform.is('core') || this.platform.is('mobileweb'))) {
      // Always keep the same attributes as we send
      this.oneSignal.deleteTags(['id', 'name', 'email']);
    }
  }
}
