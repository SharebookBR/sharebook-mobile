import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDonationsPage } from './my-donations';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    MyDonationsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MyDonationsPage),
  ],
})
export class MyDonationsPageModule {}
