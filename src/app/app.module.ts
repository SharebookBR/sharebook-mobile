import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
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
import {JwtInterceptor} from '../core/interceptors/jwt.interceptor';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {CategoryService} from "../services/category/category.service";
import {Camera} from "@ionic-native/camera";
import {ContactUsService} from "../services/contact-us/contact-us-service";
import {OneSignal} from "@ionic-native/onesignal";

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
    OneSignal,
    StatusBar,
    SplashScreen,
    UserService,
    CategoryService,
    BookService,
    AuthenticationService,
    SessionService,
    AppVersion,
    PhotoViewer,
    Camera,
    ContactUsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class AppModule {
}
