import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {SessionService} from "../../services/session/session.service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public sessionService: SessionService
  ) {

  }

}
