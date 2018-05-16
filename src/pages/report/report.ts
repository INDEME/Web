import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  encuestaId: any;
  asks: any;
  answer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.encuestaId = navParams.get('encuesta_id');
    console.log(this.encuestaId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  addAskOption(){
    console.log(this.answer);
    this.asks.push(this.answer);
    console.log(this.asks[0]);
  }

  deleteAskOption(){
    if(this.asks.length >= 1){
      this.asks.pop();
    } 
    console.log("Tamano"+this.asks.length);
  }

  
}
