import 'rxjs/Rx';
import { Component, NavController, NavParams, LoadingController, ToastController,
  Response, Http, CalculatorPage, UserPage, LoginPage, AuthSevice, CreatePage, AuthenticatePage,
  ResultpollsPage, DoPoollPage, SeePollPage, GraphicPage, LibraryPage, AlertController, 
  ReportPage, ConsultaProvider } from '../index.paginas';

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

  constructor(public loadingCtrl: LoadingController,public consulta:ConsultaProvider, public navCtrl: NavController, private toastCtrl:ToastController, public navParams: NavParams, private alertCtrl: AlertController, public http:Http,  public auth: AuthSevice) {
    localStorage.getItem("token");
    this.usuario = parseInt(localStorage.getItem("usuario"));
    this.loading = this.loadingCtrl.create({
      content: 'Cargando tus encuestas...'
  });
  this.loading.present();
  }

  ionViewDidLoad() {
    if(localStorage.getItem("token") == "false"){
      this.navCtrl.push(LoginPage);
    }
    this.updatePoll();
  }

  updatePoll(){

    return new Promise(resolve => {
      this.consulta.getUpdatePoll(this.usuario).then(results => {
        this.resultado = results;
        this.loading.dismiss();
        return resolve();
      }).catch(err => {  
        return resolve();
      });
    })

    /*this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsGet/'+ this.usuario).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      this.loading.dismiss();
    });*/
  }

    goToMath(){
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
            ,
            {
              type: 'radio',
              label: 'Eliminar encuesta.',
              value: '5'
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
              }
            },
            {
              text: 'Aceptar',
              handler: (data:string) => {
                if (data == "0"){
                  this.navCtrl.push(SeePollPage, {encuesta_id});
                }
                else if (data == "1"){
                  this.navCtrl.push(DoPoollPage, {encuesta_id});
                }
                else if (data == "2"){
                  this.navCtrl.push(GraphicPage, {encuesta_id});
                }
                else if (data == "3"){
                  this.navCtrl.push(ResultpollsPage, {encuesta_id});
                }
                else if (data == "4"){
                  this.navCtrl.push(ReportPage);
                }
                else if (data == "5"){
                  this.deletePoll(encuesta_id);
                }
                }
            }
          ]
        });
        alert.present();
      }
    
      create(){
        this.http.post('https://apex.oracle.com/pls/apex/indeme/INpolls/', {
          'id': this.usuario
        }).map((response:Response)=>{
          return response.json();
        }).subscribe(
          ()=> {
          
        },
          (error)=>{
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
      this.http.post('https://apex.oracle.com/pls/apex/indeme/IN/deletePoll/' ,{
        'id_encuesta': encuesta}).map((response:Response)=>{
        return response.json();
      }).subscribe(
        ()=> {
        this.presentToast("Encuesta eliminada.");
      },
        (error)=>{
          this.presentToast("Encuesta eliminada.");
          this.updatePoll();
        }
      )           
    }
}
