import { Component, IonicPage, NavController, NavParams, LoginPage, HomePage, AuthSevice } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html',
})
export class AuthenticatePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthSevice,
  
  ) {
    
  }

  ionViewDidLoad() {
    console.log('Token:' + localStorage.getItem("token"));
    if (localStorage.getItem("token") == "true") {
      this.auth.userAuth = true;
      this.navCtrl.setRoot(HomePage);
    } else{
      this.auth.userAuth = false;
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
