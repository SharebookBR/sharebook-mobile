import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailsPage } from './book-details';

@NgModule({
  declarations: [
    BookDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookDetailsPage),
  ],
})
export class BookDetailsPageModule {}
