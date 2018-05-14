import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CalculatorPage } from '../calculator/calculator';
import { ToastController } from 'ionic-angular';
import { Http, Response} from '@angular/http';
import 'rxjs/Rx';

import { AuthenticatePage } from '../authenticate/authenticate';
import { AuthSevice } from '../../services/auth/auth';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  nombre: string;
  contrasena: string;
  contrasena2: string;
  datoNombre: string;
  usuario: string;
  IdentificadorUsuario: any;
  nombreUsuario: string;
  resultado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl:ToastController, public auth: AuthSevice, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
    this.datoNombre = this.auth.NombreUsuario;
    this.IdentificadorUsuario = this.auth.idUsuario;
    this.nombreUsuario = "Hola a: "+this.datoNombre;
    console.log(this.IdentificadorUsuario);
  }

     goToMath(){
        this.navCtrl.push(CalculatorPage);
    }
     goToHome(){
        this.navCtrl.push(HomePage);
    }
    logout(){
      localStorage.setItem("token","false");
      this.navCtrl.setRoot(AuthenticatePage);
      this.auth.idUsuario = "";
      
    }

    edit(){
      if(this.contrasena != null && this.contrasena2 != null && this.contrasena == this.contrasena2){
        this.http.post('https://apex.oracle.com/pls/apex/indeme/INmodify/', {
          'contrasena': this.contrasena,
          'id_usuarios': this.IdentificadorUsuario
        }).map((response:Response)=>{
          return response.json();
        }).subscribe(
          ()=> {console.log("Success");
          this.presentToast("Se ha modificado tu cuenta satisfactoriamente.");
        },
          (error)=>{
            console.log('error');
            this.presentToast("Se ha modificado tu cuenta satisfactoriamente.");
          }
        )
  }
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
