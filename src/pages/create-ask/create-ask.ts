import 'rxjs/Rx';
import { Component, IonicPage, NavController, NavParams, HomePage, AuthSevice, ToastController, AlertController,
  Response, Http } from '../index.paginas';

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
  }

  ionViewDidLoad() {
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsGet/' + this.IdentificadorUsuario ).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      if(data.items.length >= 1){
        this.id_encuesta = this.resultado[data.items.length-1].id_encuesta;
      }
      else{
      }});      
  }

 goToPolls(){
  this.navCtrl.push(HomePage);
 }

  OnSave(){
    this.http.post('https://apex.oracle.com/pls/apex/indeme/INask/', {
      'id_encuesta': this.id_encuesta,
      'id_tipo': this.id_tipo,
      'pregunta': this.pregunta
    }).map((response:Response)=>{
      return response.json();
    }).subscribe(
      ()=> {
    },
      (error)=>{
      }
    )
    this.isenabled =true; 
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INaskGet/' + this.id_encuesta +"/"+this.pregunta ).map(res => res.json()).subscribe(data => {
      this.resultAsk = data.items;
      this.id_pregunta = this.resultAsk[0];
      if(data.items.length >= 1){
        this.id_pregunta = this.resultAsk[data.items.length-1].id_pregunta;
      }
      else{
      }
    });
   
  }

  addAskOption(){
    this.asks.push(this.answer);
  }

  deleteAskOption(){
    if(this.asks.length >= 1){
      this.asks.pop();
    } 
  }

  addAskSlider(){
    this.askSliderCount = this.answer + 1;
  }
  SaveAnswer(){
    if (this.pregunta != null){
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INaskGet/' + this.id_encuesta +"/"+this.pregunta ).map(res => res.json()).subscribe(data => {
      this.resultAsk = data.items;
      this.id_pregunta = this.resultAsk[0];
      if(data.items.length >= 1){
        this.id_pregunta = this.resultAsk[data.items.length-1].id_pregunta;
      }
      else{
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
        ()=> {
      },
        (error)=>{
        }
      )
    }
    else{
      this.presentToast("Espere un momento, inténtelo mas tarde");
    }
    }
  }
  else{
    this.presentToast("Rellena los campos con alguna pregunta.");
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
