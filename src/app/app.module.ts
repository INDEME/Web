import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthenticatePage } from '../pages/authenticate/authenticate';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { CalculatorPage } from '../pages/calculator/calculator';
import { UserPage } from '../pages/user/user';
import { SeePollPage } from '../pages/see-poll/see-poll';
import { ResultpollsPage } from '../pages/resultpolls/resultpolls';
import { LibraryPage } from '../pages/library/library';
import { GraphicPage } from '../pages/graphic/graphic';
import { DoPoollPage } from '../pages/do-pooll/do-pooll';
import { CreateAskPage } from '../pages/create-ask/create-ask';
import { CreatePage } from '../pages/create/create';
import { ReportPage } from '../pages/report/report';

import { ConsultaProvider } from '../providers/consulta/consulta';
import { AuthSevice } from '../services/auth/auth';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthenticatePage,
    SignupPage,
    LoginPage,
    CalculatorPage,
    ReportPage,
    UserPage,
    SeePollPage,
    ResultpollsPage,
    LibraryPage,
    GraphicPage,
    DoPoollPage,
    CreatePage,
    CreateAskPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthenticatePage,
    SignupPage,
    LoginPage,
    CalculatorPage,
    UserPage,
    ReportPage,
    SeePollPage,
    ResultpollsPage,
    LibraryPage,
    GraphicPage,
    DoPoollPage,
    CreatePage,
    CreateAskPage
  ],
  providers: [
    StatusBar, 
    AuthSevice,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConsultaProvider 
  ]
})
export class AppModule {}
