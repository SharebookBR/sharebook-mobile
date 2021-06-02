import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WinnerPage } from './winner';

@NgModule({
  declarations: [
    WinnerPage,
  ],
  imports: [
    IonicPageModule.forChild(WinnerPage),
  ],
})
export class WinnerPageModule {}
