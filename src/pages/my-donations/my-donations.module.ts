import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDonationsPage } from './my-donations';

@NgModule({
  declarations: [
    MyDonationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDonationsPage),
  ],
})
export class MyDonationsPageModule {}
