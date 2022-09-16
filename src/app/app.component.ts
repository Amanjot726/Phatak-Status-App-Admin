import { Component } from '@angular/core';
import { signOut } from '@angular/fire/auth';
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
  constructor(private dbService: DbService) {
    this.getLoggedInStatus();
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

  async logout() {
    signOut(this.dbService.auth).then(() => {
      // Sign-out successful.
      // console.log("logged out");
    }).catch((error) => {
      // console.log(error);
      // An error happened.
    });
  }

}
