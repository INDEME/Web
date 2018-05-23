import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController 
} from 'ionic-angular';
import {
  SignupPage
} from '../signup/signup';
import {
  HomePage
} from '../home/home';
import {
  Http
} from '@angular/http';
import 'rxjs/Rx';
import {
  AuthSevice
} from '../../services/auth/auth';
import {
  ToastController
} from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  nombre: string;
  contrasena: string;
  token: any;
  resultado: any;
  loading: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams,
    public auth: AuthSevice, public http: Http) {
    localStorage.setItem("token", "false");
    //this.session();
    this.loading = this.loadingCtrl.create({content: 'Iniciando sessión...'
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  session() {
    if (this.auth.idUsuario != "") {
      this.navCtrl.push(HomePage);
    } else if(this.auth.idUsuario == ""){
      this.navCtrl.push(LoginPage);
    }
  }
  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  login() {
    this.loading.present();
    this.http.get('https://apex.oracle.com/pls/apex/indeme/INgetuser/' + this.nombre + "/" + this.contrasena).map(res => res.json()).subscribe(data => {
      this.resultado = data.items;
      if (data.items.length >= 1) {
        this.auth.idUsuario = this.resultado[0].id_usuarios;
        this.auth.NombreUsuario = this.resultado[0].nombres;  
        console.log("Resultado auth: "+ this.resultado[0].id_usuarios);      
        localStorage.setItem("token", "true");
        localStorage.setItem("usuario", this.resultado[0].id_usuarios);
        this.loading.dismiss();

        this.navCtrl.push(HomePage);
      } else {
        this.presentToast("Usuario y/o contraseña incorrectos.");
      }
    });
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
