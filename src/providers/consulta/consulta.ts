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

  getPollsByUser(nombre){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsGet/' + nombre).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }

  getUpdatePoll(usuario){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsGet/' + usuario).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }

  getPollSearchDoPoll(id_encuesta){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/INpollsSearch/' + id_encuesta).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }

  getAskItemsDoPoll(id_encuesta){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/INaskItems/' + id_encuesta).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }

  getAskAllResults(id_encuesta){
    return new Promise((resolve, reject) => {
      this.http.get('https://apex.oracle.com/pls/apex/indeme/IN/askAll/' + id_encuesta).map(res => res.json())
        .subscribe(data => {
          resolve(data.items);
        });
    });
  }
  
}

