import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { DbService } from './db.service';


@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  IsGuest = false;
  IsLoggedIn = false;

  constructor(private router: Router, private firestore: Firestore, private ngZone: NgZone, private dbService: DbService) {
    provideFirebaseApp(() => initializeApp(environment.firebase));
    this.getLoggedInStatus();
    this.getGuestStatus();
  }

  async getLoggedInStatus() {
    this.dbService.IsLoggedIn.subscribe((data) => {
      this.IsLoggedIn = data;
    });
  }

  async getGuestStatus() {
    this.dbService.IsGuest.subscribe((data) => {
      this.IsGuest = data;
    });
    this.dbService.IsLoggedIn.subscribe((data) => {
      if (!data) {
        console.log("Redirecting to Login by Login Gaurd Service");
        this.ngZone.run(() => this.router.navigate(['Login']));
      }
    });
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const auth = getAuth();
      if (this.IsLoggedIn || this.IsGuest) {
        return true;
      }
      else {
        this.ngZone.run(() => this.router.navigate(['/Login']));
        return false;
      }
      // this.dbService.IsGuest.subscribe((data) => {
      //   if (data) {
      //     // this.ngZone.run(() => this.router.navigate(['/']));
      //   }
      //   else{
      //     this.dbService.IsLoggedIn.subscribe((data) => {
      //       if (data) {
      //       } else {
      //         this.ngZone.run(() => this.router.navigate(['Login']));
      //       }
      //     });

          // onAuthStateChanged(auth, (user) => {
          //   if (user) {
          //     // User is signed in
          //     const uid = user.uid;
          //     // if(this.dbService.getisAdmin(uid)){
          //     //   console.log("Redirecting to Home by gaurd service");
          //     //   this.ngZone.run(() => this.router.navigate(['/']));
          //     // }
          //     // else{
          //     //   console.log("Redirecting to Login by gaurd service1");
          //     //   this.ngZone.run(() => this.router.navigate(['Login']));
          //     // }
          //     return true;
          //   } else {
          //     // User is signed out
          //     console.log("Redirecting to Login by gaurd service2");
          //     this.ngZone.run(() => this.router.navigate(['Login']));
          //     return false;
          //   }
          // });
          // return false;

      //   }
      // });
    return true;
  }

}
