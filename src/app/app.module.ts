import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserService} from "../services/user/user.service";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "../services/book/book.service";
import {IonicStorageModule} from "@ionic/storage";
import {SessionService} from "../services/session/session.service";
import {AppVersion} from "@ionic-native/app-version";
import {PhotoViewer} from "@ionic-native/photo-viewer";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    // CategoryService,
    BookService,
    AuthenticationService,
    SessionService,
    AppVersion,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}
