import 'rxjs/Rx';
import { Component, IonicPage, NavController, HomePage, CalculatorPage, ToastController,
  Response, Http, AuthenticatePage, AuthSevice, NavParams } from '../index.paginas';

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
    this.datoNombre = this.auth.NombreUsuario;
    this.IdentificadorUsuario = this.auth.idUsuario;
    this.nombreUsuario = "Hola a: "+this.datoNombre;
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
          ()=> {
          this.presentToast("Se ha modificado tu cuenta satisfactoriamente.");
        },
          (error)=>{
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
