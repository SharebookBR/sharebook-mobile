import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequesterPickerPage } from './requester-picker';

@NgModule({
  declarations: [
    RequesterPickerPage,
  ],
  imports: [
    IonicPageModule.forChild(RequesterPickerPage),
  ],
})
export class RequesterPickerPageModule {}
