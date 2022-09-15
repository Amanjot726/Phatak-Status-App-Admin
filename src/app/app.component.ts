import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Phatak App';
  splashScreen = true;
  display_splash = true;
  constructor() {
    setTimeout(() => {
      this.splashScreen = false;
      setTimeout(() => {
        this.display_splash = false;
      }, 800);
    }, 2300);
  }
}
