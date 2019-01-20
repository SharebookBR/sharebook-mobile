import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = 'HomePage';
  myRequestsPage = 'MyRequestsPage';
  myDonationsPage = 'MyDonationsPage';
  settingsPage = 'SettingsPage';

  constructor(
    public navCtrl: NavController
  ) {

  }
}
