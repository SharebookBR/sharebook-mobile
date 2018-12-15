import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonatePage } from './donate';

@NgModule({
  declarations: [
    DonatePage,
  ],
  imports: [
    IonicPageModule.forChild(DonatePage),
  ],
})
export class DonatePageModule {}
