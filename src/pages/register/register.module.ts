import { RecaptchaModule } from 'ng-recaptcha';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    RecaptchaModule,
  ],
})
export class RegisterPageModule {}
