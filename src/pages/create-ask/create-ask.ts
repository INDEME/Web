import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { AuthSevice } from '../../services/auth/auth';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the CreateAskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-ask',
  templateUrl: 'create-ask.html',
})
export class CreateAskPage {
  item;
  resultado: any;
  resultAsk: any;
  id_encuesta: any;
  id_tipo: any;
  id_pregunta: any;
  IdentificadorUsuario: any;
  pregunta: any;
  noAsks: number;
  asks: any;
  askSlider: any;
  answer: any;
  askSliderCount: number;
  idEncuestas: any [] = [];
  isenabled:boolean=false;

  constructor(public navCtrl: NavController, private toastCtrl:ToastController, public alertCtrl:AlertController, public navParams: NavParams, public http:Http, public auth: AuthSevice) {
    this.IdentificadorUsuario = parseInt(localStorage.getItem("usuario"));
    this.item = navParams.data.item;
    this.id_tipo = this.navParams.data.item.id;
    this.asks = []; 
    this.askSlider = [];
    console.log("Id usuario preguntas constructor: "+this.auth.idUsuario);
  }

  ionViewDidLoad() {
    console.log("Id usuario preguntas: "+this.auth.idUsuario);
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsGet/' + this.IdentificadorUsuario ).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      console.log(this.resultado);
      if(data.items.length >= 1){
        console.log("Holaaaaaaa: "+ this.resultado[data.items.length-1].id_encuesta);
        this.id_encuesta = this.resultado[data.items.length-1].id_encuesta;
        console.log ("Hola soy la encuesta: " + this.id_encuesta);
      }
      else{
        console.log("id encuesta no encontrado"); 
      }});

      
  }

 goToPolls(){
  this.navCtrl.push(HomePage);
 }

  OnSave(){
    console.log(this.id_encuesta + "La encuesta es:");
    this.http.post('https://apex.oracle.com/pls/apex/indeme/INask/', {
      'id_encuesta': this.id_encuesta,
      'id_tipo': this.id_tipo,
      'pregunta': this.pregunta
    }).map((response:Response)=>{
      return response.json();
    }).subscribe(
      ()=> {console.log("Success");
    },
      (error)=>{
        console.log('error');
      }
    )
    this.isenabled=true; 

    this.http.get('https://apex.oracle.com/pls/apex/indeme/INaskGet/' + this.id_encuesta +"/"+this.pregunta ).map(res => res.json()).subscribe(data => {
      this.resultAsk = data.items;
      console.log(this.resultAsk[0]);
      this.id_pregunta = this.resultAsk[0];
      if(data.items.length >= 1){
        console.log("Pregunta noumero: "+ this.resultAsk[data.items.length-1].id_pregunta);
        this.id_pregunta = this.resultAsk[data.items.length-1].id_pregunta;
      }

      else{
        console.log("pregunta no encontrada"); 
      }

    });
   
  }
  addAskOption(){
    console.log(this.answer);
    this.asks.push(this.answer);
    console.log(this.asks[0]);
  }
  deleteAskOption(){
    if(this.asks.length >= 1){
      this.asks.pop();
    }
    
    console.log("Tamano"+this.asks.length);
  }
  addAskSlider(){
    
    this.askSliderCount = this.answer + 1;
    
  }
  SaveAnswer(){
    console.log("Encuesta " +this.id_encuesta);
    console.log("Pregunta " + this.pregunta);
    
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INaskGet/' + this.id_encuesta +"/"+this.pregunta ).map(res => res.json()).subscribe(data => {
      this.resultAsk = data.items;
      console.log(this.resultAsk[0]);
      this.id_pregunta = this.resultAsk[0];
      if(data.items.length >= 1){
        console.log("Pregunta noumero: "+ this.resultAsk[data.items.length-1].id_pregunta);
        this.id_pregunta = this.resultAsk[data.items.length-1].id_pregunta;
      }

      else{
        console.log("pregunta no encontrada"); 
      }

    });
    
    for(var i=0; i < this.asks.length; i++){
      if (this.id_pregunta != null){
      this.http.post('https://apex.oracle.com/pls/apex/indeme/INanswer/', {
        'id_encuesta': this.id_encuesta,
        'id_pregunta': this.id_pregunta,
        'respuesta': this.asks[i]
      }).map((response:Response)=>{
        return response.json();
      }).subscribe(
        ()=> {console.log("Success");
      },
        (error)=>{
          console.log('error');
        }
      )
    }
    else{
      this.presentToast("Espere un momento, inténtelo mas tarde");
    }
    }
    console.log("HOAAAAAAAAAAAAa");
    console.log(this.id_encuesta);
    console.log(this.id_pregunta);
    console.log(this.asks);

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
