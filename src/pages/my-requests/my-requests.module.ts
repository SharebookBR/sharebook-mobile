import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRequestsPage } from './my-requests';

@NgModule({
  declarations: [
    MyRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRequestsPage),
  ],
})
export class MyRequestsPageModule {}
