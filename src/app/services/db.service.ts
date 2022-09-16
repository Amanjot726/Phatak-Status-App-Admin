import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { onAuthStateChanged } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  phataksList = new BehaviorSubject<any[]>([]);
  IsLoggedIn = new BehaviorSubject<any>(false);
  auth = getAuth();

  getPhataks(){
    let collectionRef = collection(this.firestore, "Crossings");
    onSnapshot(collectionRef, (value) => {
      this.phataksList.next(value.docs.map((doc) => ({id: doc.id, ...doc.data()})));
      // this.phataksList = value.docs.map(e => ({ id: e.id, ...e.data() }));
      console.log("here", this.phataksList)
    }, (error) => {
      console.log(error);
    });
    // return this.phataksList;
  }

  updateAuthState(status: boolean){
    this.IsLoggedIn.next(status);
  }



  constructor(private firestore: Firestore) {
    this.getPhataks()
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        this.updateAuthState(true);
      } else {
        // User is signed out
        this.updateAuthState(false);
      }
    });
  }
}
