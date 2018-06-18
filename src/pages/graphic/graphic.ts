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

  preguntas: string[] = ['', 'Pregunta 1', 'Pregunta 2', 'Pregunta 3'];
  nombres: string [] = ['Polo', 'Julio', 'Verne'];
  valores: number [] = [500, 600, 700];

  paises: string [] = ['México', 'USA', 'España', 'Cataluña'];
  valor: number [] = [300, 400, 50, 20];

  empresas: string [] = ['SpaceX', 'Tesla'];
  val: number [] = [10, 15];

  doughnutChartLabels: string [];
  doughnutChartData: number [];
  public doughnutChartType: string = 'pie';
  conta : number = 0;
  pregunta: string;
  

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public consulta: ConsultaProvider, public navParams: NavParams, public http:Http) {
    this.encuestaId = navParams.get('encuesta_id');
    this.contar();
    this.pregunta = this.preguntas[this.conta];
      this.doughnutChartLabels = this.paises;
      
      this.doughnutChartData = this.valor;
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando resultados...'
  });
  this.loading.present();
    this.http.get('https://apex.oracle.com/pls/apex/indeme/IN/askAll/' + this.encuestaId).map(res => res.json()).subscribe(data => {
      this.resultado2 = data.items;
      console.log(this.resultado2);
      this.loading.dismiss();
    });
  }

  contar(){
    console.log(this.resultado2);
    this.conta ++;
    this.doughnutChartLabels = [];
      this.doughnutChartData =[];
    if (this.conta == 1){
      this.pregunta = this.preguntas[this.conta];
      this.doughnutChartLabels = this.paises;
      
      this.doughnutChartData = this.valor;
    }
    if(this.conta == 2){
      this.pregunta = this.preguntas[this.conta];
      this.doughnutChartLabels = this.nombres;
      this.doughnutChartData = this.valores;
    }
    if(this.conta == 3){
      this.pregunta = this.preguntas[this.conta];
      this.doughnutChartLabels = this.empresas;
      this.doughnutChartData = this.val;
    }
  }

  contarRegresar(){
    this.conta --;
    this.doughnutChartLabels = [];
      this.doughnutChartData =[];
    if (this.conta == 1){
      this.pregunta = this.preguntas[this.conta];
      this.doughnutChartLabels = [];
      this.doughnutChartLabels = this.paises;
      
      this.doughnutChartData = this.valor;
    }
    if(this.conta == 2){
      this.pregunta = this.preguntas[this.conta];
      this.doughnutChartLabels = [];
      this.doughnutChartLabels = this.nombres;
      this.doughnutChartData = this.valores;
    }
    if(this.conta == 3){
      this.pregunta = this.preguntas[this.conta];
      this.doughnutChartLabels = [];
      this.doughnutChartLabels = this.empresas;
      this.doughnutChartData = this.val;
    }
  }
}
