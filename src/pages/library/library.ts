import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ConsultaProvider} from '../../providers/consulta/consulta';
import { UserPage } from '../user/user';
import { CalculatorPage } from '../calculator/calculator';
import { AuthSevice } from '../../services/auth/auth';
import { HomePage } from '../home/home';
import { AuthenticatePage } from '../authenticate/authenticate';
import { ToastController} from 'ionic-angular';
/**
 * Generated class for the LibraryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {
  public list: any = [];
  loading: any;
  

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController, public auth: AuthSevice, public navParams: NavParams, public consulta: ConsultaProvider) {
    this.loadList();
    this.loading = this.loadingCtrl.create({
      content: 'Cargando preguntas...'
  });
  this.loading.present();
  }

  

  
  loadList() {
  
    return new Promise(resolve => {
      this.consulta.getListPreguntas().then(results => {
        this.list = results;
        //console.log(this.list);
        this.loading.dismiss();
        return resolve();
       
      }).catch(err => {        
        console.log(err);
        return resolve();

      });
    })
  }

  
  logout(){
    localStorage.setItem("token","false");
    this.navCtrl.setRoot(AuthenticatePage);
    this.auth.idUsuario = "";
    
  }
  goToPolls(){
    this.navCtrl.push(HomePage);
   }

  doRefresh(refresher) {
    this.loadList().then(() => refresher.complete());
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
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

presentToast(message) {
  let toast = this.toastCtrl.create({
    message: '' + message,
    duration: 1000,
    position: 'middle'
  });
  toast.present();
}
}
