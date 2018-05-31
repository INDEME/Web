import { Component, IonicPage, NavController, NavParams, LoadingController, ToastController,
  Http, SignupPage, HomePage, AuthSevice } from '../index.paginas';

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
    this.loading = this.loadingCtrl.create({content: 'Iniciando sessión...'
    });
    
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
        localStorage.setItem("token", "true");
        localStorage.setItem("usuario", this.resultado[0].id_usuarios);
        this.loading.dismiss();
        this.navCtrl.push(HomePage);
      } else {
        this.loading.dismiss();
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
