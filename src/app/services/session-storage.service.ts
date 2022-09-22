import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


class SessionStorageModel{


}

export class SessionStorageService {

  sessionStorgaeModel:SessionStorageModel=new SessionStorageModel();
  constructor() { }

  public set(key:string,value:string){
    localStorage.setItem(key,value);
  }
  get(key:string):string{
    return localStorage.getItem(key);
  }
  remove(key:string){
    localStorage.removeItem(key);
  }
  clear(){
    localStorage.clear();
  }

}
