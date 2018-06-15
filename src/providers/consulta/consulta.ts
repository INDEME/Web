import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConsultaProvider {

  constructor(public http: Http) {
    //console.log('Hello ConsultaProvider Provider');
  }

  public getListPreguntas() {
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/INlibrary/').map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }

   public getListPreguntasByName(nombre){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/IN/SearchLibrary/' + nombre).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }

  public getListResult(encuestaId, nombre){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/IN/searchResult/' + encuestaId + "/" + nombre).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }

  public getListSeeAsk(encuestaId, nombre){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/IN/searchPollAsk/' + encuestaId + "/" + nombre).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }
}
