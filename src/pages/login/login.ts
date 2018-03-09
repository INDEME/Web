import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { AuthSevice } from '../../services/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model: any = {};
  nombre: string;
  contrasena: string;

  resultado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private toastCtrl:ToastController, public auth: AuthSevice, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

        goToSignUp(){
        this.navCtrl.push(SignupPage);
    }

    goToHome(){
        //this.navCtrl.push(HomePage);
        this.http.get('https://apex.oracle.com/pls/apex/indeme/INgetuser/' + this.nombre +"/"+ this.contrasena).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      //console.log(this.resultado);
      if(data.items.length >= 1){
        //this.presentToast("Acceso correcto.");
        this.auth.idUsuario = this.resultado[0].id_usuarios;
        this.auth.NombreUsuario = this.resultado[0].nombres;
        //console.log( this.auth.idUsuario);
        this.navCtrl.push(PrincipalPage);
      }
      else{
        this.presentToast("Usuario y/o contraseña incorrectos."); 
      }
    });
    }
    
    presentToast(message) {
      let toast = this.toastCtrl.create({
        message: ''+message ,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }
}
