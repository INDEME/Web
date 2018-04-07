import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalculatorPage } from '../calculator/calculator';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { AuthSevice } from '../../services/auth/auth';
import { CreatePage } from '../create/create';
import { ResultpollsPage } from '../resultpolls/resultpolls';
import { DoPoollPage } from '../do-pooll/do-pooll';
import { SeePollPage} from '../see-poll/see-poll';
import { GraphicPage } from '../graphic/graphic';
import { LibraryPage } from '../library/library';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CreateAskPage } from '../create-ask/create-ask';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    usuario: number;
  numero: number;
  AskNumber : number;
  contador: number;
  aswer: string;
  Ask: any[] = [];
  array = [];
  resultado: any;
  pollsUser: any [] = [];

  constructor(public navCtrl: NavController, private toastCtrl:ToastController, public navParams: NavParams, private alertCtrl: AlertController, public http:Http,  public auth: AuthSevice) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
    this.usuario = this.auth.idUsuario;
    console.log(this.usuario + "hola");
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsGet/'+ this.auth.idUsuario).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      console.log(this.resultado);
    });
  }

    goToMath(){
        console.log(this.auth.idUsuario);
        this.navCtrl.push(CalculatorPage);
    }
    
    goToUser(){
        this.navCtrl.push(UserPage);
    }

    library(){
        this.navCtrl.push(LibraryPage);
    }

    goOut(){
        this.navCtrl.push(LoginPage);
    }

    menu(encuesta_id){
    

        var myJsonString = JSON.stringify(this.pollsUser);
        console.log("///////////////");
        console.log(myJsonString);
        console.log(encuesta_id);
        console.log("///////////////");
        let alert = this.alertCtrl.create({
          title: '¿Qué deseas hacer?',
          inputs: [
            {
              type: 'radio',
              label: 'Visualizar encuesta.',
              value: '0'
            },
            {
              type: 'radio',
              label: 'Aplicar encuesta.',
              value: '1'
            },
            {
              type: 'radio',
              label: 'Graficar resultados.',
              value: '2'
            }
            ,
            {
              type: 'radio',
              label: 'Ver resultados.',
              value: '3'
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Aceptar',
              handler: (data:string) => {
                console.log(data);
                if (data == "0"){
                  console.log("Visualizar encuesta");
                  this.navCtrl.push(SeePollPage, {encuesta_id});
                }
                else if (data == "1"){
                  console.log("Aplicar encuesta");
                  this.navCtrl.push(DoPoollPage, {encuesta_id});
                }
                else if (data == "2"){
                  console.log("Graficar encuesta");
                  this.navCtrl.push(GraphicPage);
                }
                else if (data == "3"){
                  console.log("Ver encuesta");
                  this.navCtrl.push(ResultpollsPage, {encuesta_id});
                }
                }
            }
          ]
        });
        alert.present();
      }
    
    
      create(){
        this.usuario = this.auth.idUsuario;
        console.log(this.usuario);
        this.http.post('https://apex.oracle.com/pls/apex/indeme/INpolls/', {
          'id': this.usuario
        }).map((response:Response)=>{
          return response.json();
          //console.log (response.json());
        }).subscribe(
          ()=> {console.log("Success");
          
        },
          (error)=>{
            console.log('error'+ error);
          }
        )
        this.navCtrl.push(CreatePage);
    }
    
    add(){
      console.log(this.aswer);
      if(this.Ask.length < 2){
      this.Ask.push(this.aswer);
      console.log(this.Ask[0]);
      console.log(this.Ask.length);
    }
    else{
      this.presentToast("No puedes agregar más.");
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
