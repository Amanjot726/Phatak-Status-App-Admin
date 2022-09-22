import { Injectable, NgZone } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { collection, doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

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



  constructor(private firestore: Firestore, private router: Router, private ngZone: NgZone, private sessionStorage:SessionStorageService) {
    this.getPhataks()
    this.getGuestStatus();
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

  public setGuestStatus(status: boolean){
    if (status) {
      // this.IsLoggedIn.next(true);
      this.IsGuest.next(true);
      this.sessionStorage.set("IsGuest", "true");
    }
    else{
      // this.IsLoggedIn.next(false);
      this.IsGuest.next(false);
      this.sessionStorage.set("IsGuest", "false");
    }

    console.log("DbService -> setGuestStatus:", status);
  }

  async getGuestStatus(){
    let status = this.sessionStorage.get("IsGuest");
    if (status == "true") {
      console.log("DbService -> setting guest status to true");
      this.IsLoggedIn.next(true);
      this.IsGuest.next(true);
    }
    else{
      console.log("DbService -> setting guest status to false");
      this.IsLoggedIn.next(false);
      this.IsGuest.next(false);
    }
    console.log("DbService -> IsGuest:", status);
  }


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


}
