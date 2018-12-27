import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmAddressPage } from './confirm-address';

@NgModule({
  declarations: [
    ConfirmAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmAddressPage),
  ],
})
export class ConfirmAddressPageModule {}
