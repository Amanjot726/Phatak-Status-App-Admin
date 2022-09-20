import { Injectable, NgZone } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { collection, doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  phataksList = new BehaviorSubject<any[]>([]);
  IsLoggedIn = new BehaviorSubject<any>(false);
  IsWrongUrl = new BehaviorSubject<any>(false);
  IsAdmin = new BehaviorSubject<any>(false);
  IsGuest = new BehaviorSubject<any>(false);
  // UserID = new Be;
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

  async getisAdmin(uid: any){
    let admin = false;
    const unsub = onSnapshot(doc(this.firestore, "Users", uid), (doc) => {
      // console.log("Current data: ", doc.data());
      console.log("Is Admin: ",doc.data()?.["isAdmin"]);
      this.IsAdmin.next(doc.data()?.["isAdmin"]);
      if (doc.data()?.["isAdmin"]) {
        admin = true;
      }
    });
    return admin;
  }



  constructor(private firestore: Firestore, private router: Router, private ngZone: NgZone) {
    this.getPhataks()
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        this.updateAuthState(true);
        this.getisAdmin(uid);
      } else {
        // User is signed out
        this.updateAuthState(false);
      }
    });
  }
}
