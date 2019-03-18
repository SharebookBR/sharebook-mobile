import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsPage } from './terms';

@NgModule({
  declarations: [
    TermsPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsPage),
  ],
})
export class TermsPageModule {}
