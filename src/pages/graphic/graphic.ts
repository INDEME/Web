import { Component, IonicPage, NavController, NavParams, ConsultaProvider, LoadingController, Http } from '../index.paginas';


@IonicPage()
@Component({
  selector: 'page-graphic',
  templateUrl: 'graphic.html',
})
export class GraphicPage {
  encuestaId: any;
  resultado2: any;
  loading: any;
  nombre: string;
  preguntasVector: string;
  resultados: string [] = [];
  respuestas: string [] = [];

  
  nombres: string [] = ['Polo', 'Julio', 'Verne'];
  valores: string [] = ['500', '600', '700'];

  paises: string [] = ['México', 'USA', 'España', 'Cataluña'];
  valor: number [] = [300, 400, 50, 20];

  inicial: string [] = ['', '', '', ''];
  valoresIniciales: string [] = ['97', '1', '1', '1'];

  doughnutChartLabels: string [];
  doughnutChartData: string [];
  public doughnutChartType: string = 'pie';
  conta : number = 0;
  conta2 : number = 0;
  preguntaShow: any;
  preguntaAux: any;
  resAux: any;
  

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public consulta: ConsultaProvider, public navParams: NavParams, public http:Http) {
    this.encuestaId = navParams.get('encuesta_id');
    this.doughnutChartLabels = this.inicial;
    this.doughnutChartData = this.valoresIniciales;
    this.preguntaShow = "Grafica de muestra.";
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando resultados...'
  });
  this.loading.present();
  this.http.get('https://apex.oracle.com/pls/apex/indeme/IN/onlyAsk/' + this.encuestaId).map(res => res.json()).subscribe(data => {
      this.preguntasVector = data.items;
    });
    this.http.get('https://apex.oracle.com/pls/apex/indeme/IN/askAll/' + this.encuestaId).map(res => res.json()).subscribe(data => {
      this.resultado2 = data.items;
      this.loading.dismiss();
    });
  }

  clear(){
    this.doughnutChartLabels = [];
    this.doughnutChartData =[];
    this.respuestas = [];
    this.resultados = [];
    this.resAux = [];
  }

  contar(){
    if (this.conta >= 0 && this.conta + 1 < this.preguntasVector.length  ){
    this.conta ++;
    this.clear();
    this.preguntaAux = this.preguntasVector[this.conta];
    this.preguntaShow = this.preguntaAux.pregunta;
    for (var i = 0; i <= this.resultado2.length - 1 ; i++){
      if (this.resultado2[i].pregunta == this.preguntaShow){
        this.resAux.push(this.resultado2[i]);
      }
    }
    this.separar(this.resAux);
    }
  }

  separar(vectorSeparar){
    for (var w = 0; w <= vectorSeparar.length - 1; w++){
      this.respuestas.push(vectorSeparar[w].respuesta);
      this.resultados.push(vectorSeparar[w].resultados);
    }
    this.doughnutChartLabels = this.respuestas;
    this.doughnutChartData = this.resultados;
  }

  contarRegresar(){
    if (this.conta >= 0 && this.conta <= this.preguntasVector.length){
      if (this.conta == 0){}
      else if (this.conta >= 1) { this.conta --; }
      this.clear();
      this.preguntaAux = this.preguntasVector[this.conta];
      this.preguntaShow = this.preguntaAux.pregunta;
      for (var i = 0; i <= this.resultado2.length - 1 ; i++){
        if (this.resultado2[i].pregunta == this.preguntaShow){
          this.resAux.push(this.resultado2[i]);
        }
      }
      this.separar(this.resAux);
      }

   
    
  }
}
