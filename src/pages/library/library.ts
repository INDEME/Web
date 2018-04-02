import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConsultaProvider} from '../../providers/consulta/consulta';
import { UserPage } from '../user/user';
import { LoginPage } from '../login/login';
import { CalculatorPage } from '../calculator/calculator';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public consulta: ConsultaProvider) {
    this.loadList();
  }

  loadList() {
    return new Promise(resolve => {
      this.consulta.getListPreguntas().then(results => {
        this.list = results;
        //console.log(this.list);
        return resolve();

      }).catch(err => {        
        console.log(err);
        return resolve();

      });
    })
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

}
