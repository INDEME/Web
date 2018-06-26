import { Component, IonicPage, NavController, NavParams, LoginPage, HomePage, AuthSevice } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html',
})
export class AuthenticatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthSevice) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticatePage');
    if (localStorage.getItem("token") == "true") {
      this.navCtrl.push(HomePage);
    } else{
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
