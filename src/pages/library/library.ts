import { Component, IonicPage, NavController, NavParams, LoadingController, ToastController,
  UserPage, CalculatorPage, AuthSevice, HomePage, AuthenticatePage, ConsultaProvider} from '../index.paginas';

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
        this.loading.dismiss();
        return resolve();
      }).catch(err => {  
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
