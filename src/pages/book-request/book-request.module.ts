import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookRequestPage } from './book-request';

@NgModule({
  declarations: [
    BookRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(BookRequestPage),
  ],
})
export class BookRequestPageModule {}
