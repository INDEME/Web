import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalculatorPage } from '../calculator/calculator';
import { UserPage } from '../user/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

    goToMath(){
        this.navCtrl.push(CalculatorPage);
    }
    
    goToUser(){
        this.navCtrl.push(UserPage);
    }

}
