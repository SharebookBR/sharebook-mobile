import { Component } from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  constructor(
    public viewCtrl: ViewController,
  ) {

  }

  dismiss(data?) {
    this.viewCtrl.dismiss(data);
  }
}
