import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { ToastController } from 'ionic-angular';


/**
 * Generated class for the CalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  poblacionValor: number;
  errorValor: number;
  nivelValor: number;
  POBLACIONVALOR2: number;
  ERRORVALOR2: number;
  NIVELVALOR2: number;
  RESULTADO: string;
  confianza:  number;
  CONFIANZA2: number;
  E: number;
  EN: number;
  Z: number;
  RESULTADOP: number;
  private P = 0.5;
  private DIVISOR: number;
  PROCENTAJE: number;
  PARTE1: number;
  PARTE2: number;
  DIVIDIENDO: number;
  TOTAL: number;
  totalResultado: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatorPage');
  }

    goToHome(){
        this.navCtrl.push(HomePage);
    }
    
     goToUser(){
        this.navCtrl.push(UserPage);
    }

    calcularMuestra(){
      console.log("hola");
    }

    

    presentToast(resultadoFinal: number) {
      let toast = this.toastCtrl.create({
        message: 'Resultado: ' + resultadoFinal,
        duration: 3000,
        position: 'middle'
      });
    
    
      toast.present();
    }
}
