import { Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  phataksList = new BehaviorSubject<any[]>([]);

  getPhataks(){
    let collectionRef = collection(this.firestore, "Crossings");
    onSnapshot(collectionRef, (value) => {
      this.phataksList.next(value.docs.map((doc) => doc.data()));
      // this.phataksList = value.docs.map(e => ({ id: e.id, ...e.data() }));
      console.log("here", this.phataksList)
    }, (error) => {
      console.log(error);
    });
    // return this.phataksList;
  }

  setPhataks(){

  }

  constructor(private firestore: Firestore) {
    this.getPhataks()
  }
}
