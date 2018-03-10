import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalculatorPage } from '../calculator/calculator';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { AuthSevice } from '../../services/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthSevice) {
    
  }

    goToMath(){
        console.log(this.auth.idUsuario);
        this.navCtrl.push(CalculatorPage);
    }
    
    goToUser(){
        this.navCtrl.push(UserPage);
    }

    goOut(){
        this.navCtrl.push(LoginPage);
    }
}
