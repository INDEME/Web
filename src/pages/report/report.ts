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
  asks: any [] = [];
  answer: any;
  askSliderCount: any;
  title: any;
  graphic: any [] = [];
  annexA: any [] = [];
  annexB: any [] = [];
  annexC: any [] = [];
  annexD: any [] = [];
  answerannexA: any [] = [];
  answerannexB: any [] = [];
  answerannexC: any [] = [];
  answerannexD: any [] = [];
  operacion: any [] = [];
  variable: any;
  dimension: any;
  indicator: any;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.encuestaId = navParams.get('encuesta_id');
    console.log(this.encuestaId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  addAskOption(){
    if(this.variable != null && this.dimension != null && this.indicator != null && this.item != null){
    this.operacion.push(this.variable);
    this.operacion.push(this.dimension);
    this.operacion.push(this.indicator);
    this.operacion.push(this.item);
    }
  }

  deleteAskOption(){
    if(this.asks.length >= 1){
      this.asks.pop();
    } 
  }

  addGraphic(){
    this.graphic.push(this.answer);
  }

  deleteGraphic(){
    if(this.graphic.length >= 1){
      this.graphic.pop();
    } 
  }

  addA(){
    this.annexA.push(this.answerannexA);
  }

  deleteA(){
    if(this.annexA.length >= 1){
      this.annexA.pop();
    } 
  }

  addB(){
    this.annexB.push(this.answerannexB);
  }

  deleteB(){
    if(this.annexB.length >= 1){
      this.annexB.pop();
    } 
  }

  addC(){
    this.annexC.push(this.answerannexC);
  }

  deleteC(){
    if(this.annexC.length >= 1){
      this.annexC.pop();
    } 
  }

  addD(){
    this.annexD.push(this.answerannexD);
  }

  deleteD(){
    if(this.annexD.length >= 1){
      this.annexD.pop();
    } 
  }

  doReport(){

  }
  
}
