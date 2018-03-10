import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email: string;
  contrasena: string;
  contrasena2: string;
  nombre: string;

  resultado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private toastCtrl:ToastController, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  registrar(){
    if(this.email != null && this.nombre != null && this.contrasena != null && this.contrasena2 != null){
        this.http.post('https://apex.oracle.com/pls/apex/indeme/INcreate/', {
          'correo': this.email,
          'nombres': this.nombre,
          'contrasena': this.contrasena
        }).map((response:Response)=>{
          return response.json();
        }).subscribe(
          ()=> {console.log("Success");
          this.presentToast('Usuario registrado correctamente.');
        },
          (error)=>{
            console.log('error');
            this.presentToast('Error al registrarse porfavor intentelo mas tarde.');
          }
        )
  }
    else{
    this.presentToast('Rellena todos los campos de manera correcta.');
  }
}


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message + "" ,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
