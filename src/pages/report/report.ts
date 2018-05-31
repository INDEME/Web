import 'rxjs/Rx'
import { Component, IonicPage, NavController, NavParams, ToastController, Http } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  encuestaId: any;
  asks: any [] = [];
  answer: any;
  askSliderCount: any;
  title: any;
  for: any;
  by: any;
  graphic: any [] = [];
  annexA: any [] = [];
  annexB: any [] = [];
  annexC: any [] = [];
  annexD: any [] = [];
  answerannexA: any;
  answerannexB: any;
  answerannexC: any;
  answerannexD: any;
  operacion: any [] = [];
  variable: any;
  dimension: any;
  indicator: any;
  item: any;
  problem: any;
  object: any;
  research: any;
  information: any;
  instrumentation: any;
  population: any;
  analysisG: any;
  analysisC: any;
  conclusion: any;
  graphicc: any;
  showVariable: any [] = [];
  resultado: any;
  tamano: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,  public http:Http) {
    this.encuestaId = navParams.get('encuesta_id');
    console.log(this.encuestaId);
  }

  ionViewDidLoad() {
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsSearch/' + this.encuestaId).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      this.tamano = this.resultado.length;
    });
  }

  doReport(){
    if(this.title != null && this.for != null && this.by != null && this.title != null && this.problem != null &&
      this.object != null && this.research != null && this.information != null && this.instrumentation != null &&
      this.population != null && this.analysisC != null && this.analysisG != null && this.conclusion != null
      && this.graphicc != null){
        this.presentToast("Hola");
      }
    else{
      this.presentToast("Rellena los campos solicitados.")
    }

  }

  addAskOption(){
    if(this.variable != null && this.dimension != null && this.indicator != null && this.item != null){
    this.showVariable.push(this.variable);
    this.operacion.push(this.variable);
    this.operacion.push(this.dimension);
    this.operacion.push(this.indicator);
    this.operacion.push(this.item);
    }
  }

  addGraphic(){
    this.graphic.push(this.answer);
  }

  deleteGraphic(){
    if(this.graphic.length >= 1){
      this.graphic.pop();
    } 
  }

  addA(){
    this.annexA.push(this.answerannexA);
  }

  addB(){
    this.annexB.push(this.answerannexB);
  }

  addC(){
    this.annexC.push(this.answerannexC);
  }

  addD(){
    this.annexD.push(this.answerannexD);
  }
  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: '' + message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
