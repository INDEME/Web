import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthSevice } from '../../services/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
/**
 * Generated class for the AuthenticatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html',
})
export class AuthenticatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthSevice) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticatePage');
    if (localStorage.getItem("token") == "true") {
      this.navCtrl.push(HomePage);
    } else{
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
