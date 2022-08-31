import { RecaptchaModule } from 'ng-recaptcha';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    RecaptchaModule,
  ],
})
export class ContactUsPageModule {}
