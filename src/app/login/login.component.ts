import { Component, NgZone, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
		Password: new FormControl('',[Validators.required, Validators.minLength(8)]),
	});
  IsLoggedIn = false;
  IsloggedInProcessing = false;

  async getLoggedInStatus() {
    this.dbService.IsLoggedIn.subscribe((data) => {
      this.IsLoggedIn = data;
      if (this.IsLoggedIn) {
        this.ngZone.run(() => this.router.navigate(['/']));
      }
    });
  }

  constructor(private dbService: DbService, private router: Router, private ngZone: NgZone) {
    this.getLoggedInStatus();
  }


  input(input:any) {
		return this.LoginForm.get(input);
	}

  Login() {
    this.IsloggedInProcessing = true;
    if (this.LoginForm.invalid){
      this.LoginForm.markAllAsTouched();
      return;
    }
    signInWithEmailAndPassword(this.dbService.auth, this.LoginForm.get('Username')?.value, this.LoginForm.get('Password')?.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.ngZone.run(() => this.router.navigate(['/']));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
      });
      this.IsloggedInProcessing = false;
  }


  ngOnInit(): void {
  }

}
