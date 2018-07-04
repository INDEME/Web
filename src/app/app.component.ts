import { LibraryPage } from './../pages/library/library';
import { HomePage } from './../pages/home/home';
import { CalculatorPage } from './../pages/calculator/calculator';
import { AuthSevice } from './../services/auth/auth';
import { UserPage } from './../pages/user/user';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticatePage } from '../pages/authenticate/authenticate';
import { LoginPage } from '../pages/login/login';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AuthenticatePage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<any>;
  navbar: number;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public auth: AuthSevice
              ) {
    this.pages = [
      { component: HomePage, icon: "home", label: "Principal"},
      { component: CalculatorPage, icon: "calculator", label: "Calculos" },
      { component: UserPage, icon: "contact", label: "Usuario" },
      { component: LibraryPage, icon: "book", label: "Libreria" },
    ]
    this.auth.navbarAllowed = 1;
    this.navbar = this.auth.navbarAllowed;
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  
goToPage(p){
  this.auth.navbarAllowed = 1;
  this.nav.setRoot(p);
}

logout(){
  localStorage.setItem("token","false");
  this.nav.setRoot(AuthenticatePage);
  this.auth.idUsuario = "";
  this.auth.userAuth = false;
  
}


}

