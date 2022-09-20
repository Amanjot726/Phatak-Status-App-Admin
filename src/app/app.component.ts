import { Component, NgZone } from '@angular/core';
import { signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Phatak App';
  splashScreen = true;
  display_splash = true;
  IsLoggedIn = false;
  IsWrongUrl = false;
  IsGuest = false;

  constructor(private dbService: DbService, private router: Router, private ngZone: NgZone) {
    this.getLoggedInStatus();
    this.getWrongUrlStatus();
    this.getGuestStatus();
    setTimeout(() => {
      this.splashScreen = false;
      setTimeout(() => {
        this.display_splash = false;
      }, 800);
    }, 2000);
  }

  async getLoggedInStatus() {
    this.dbService.IsLoggedIn.subscribe((data) => {
      this.IsLoggedIn = data;
    });
  }

  async getWrongUrlStatus() {
    this.dbService.IsWrongUrl.subscribe((data) => {
      this.IsWrongUrl = data;
    });
  }

  async getGuestStatus() {
    this.dbService.IsGuest.subscribe((data) => {
      this.IsGuest = data;
    });
  }

  async logout() {
    if (this.IsGuest) {
      this.dbService.IsGuest.next(false);
      this.dbService.IsLoggedIn.next(false);
      // this.ngZone.run(() => this.router.navigate(['Login']));
    }
    else{
      await signOut(this.dbService.auth).then(() => {
        // Sign-out successful.
        // console.log("logged out");
      }).catch((error) => {
        console.log(error);
        // An error happened.
      });
    }
  }

}
