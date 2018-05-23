import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CalculatorPage } from '../calculator/calculator';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { AuthSevice } from '../../services/auth/auth';
import { CreatePage } from '../create/create';
import { AuthenticatePage } from '../authenticate/authenticate';
import { ResultpollsPage } from '../resultpolls/resultpolls';
import { DoPoollPage } from '../do-pooll/do-pooll';
import { SeePollPage} from '../see-poll/see-poll';
import { GraphicPage } from '../graphic/graphic';
import { LibraryPage } from '../library/library';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ReportPage } from'../report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario: number;
  loading: any;
  numero: number;
  AskNumber : number;
  contador: number;
  aswer: string;
  Ask: any[] = [];
  array = [];
  resultado: any;
  pollsUser: any [] = [];

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, private toastCtrl:ToastController, public navParams: NavParams, private alertCtrl: AlertController, public http:Http,  public auth: AuthSevice) {
    localStorage.getItem("token");
    console.log("LocalStorage "+localStorage.getItem("token"));
    this.usuario = parseInt(localStorage.getItem("usuario"));
    this.loading = this.loadingCtrl.create({
      content: 'Cargando tus encuestas...'
  });
  this.loading.present();
  }

  ionViewDidLoad() {
    console.log("Usuario local Storage: "+localStorage.getItem("usuario"));
    
    console.log("USUARIO HOME: "+this.usuario);
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsGet/'+ this.usuario).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      console.log(this.resultado);
      this.loading.dismiss();
    });
     

    console.log("LocalStorage "+localStorage.getItem("token"));

    if(localStorage.getItem("token") == "false"){
      this.navCtrl.push(LoginPage);
    }
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

    logout(){
      localStorage.setItem("token","false");
      this.navCtrl.setRoot(AuthenticatePage);
      this.auth.idUsuario = "";
      
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
            ,
            {
              type: 'radio',
              label: 'Generar reporte.',
              value: '4'
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
                else if (data == "4"){
                  console.log("Generar reporte");
                 this.navCtrl.push(ReportPage, {encuesta_id});
                }
                }
            }
          ]
        });
        alert.present();
      }
    
    
      create(){
        console.log("Crear encuesta id "+this.usuario);
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
    
    presentToast(message) {
      let toast = this.toastCtrl.create({
        message: ''+message ,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }

    deletePoll(encuesta){

    }

    modifyPoll(encuesta){

    }
}
