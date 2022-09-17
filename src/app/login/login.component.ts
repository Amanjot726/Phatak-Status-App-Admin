import { Component, NgZone, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { DbService } from '../services/db.service';
import Modal from "bootstrap/js/src/modal";

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
    const myModalEl = document.getElementById('LoginFailed');
    const modal = new Modal(myModalEl);
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
        let errorMessage = "";
        if (errorCode === 'auth/wrong-password') {
          errorMessage = "Wrong Password!!! Please try again.";
        }
        else if (errorCode === 'auth/invalid-email') {
          errorMessage = "Invalid Email!!! Please try again.";
        }
        else if (errorCode === 'auth/user-not-found') {
          errorMessage = "User not found!!! Please try again.";
        }
        else if (errorCode === 'auth/too-many-requests') {
          errorMessage = "Too many unsuccessful login attempts. Please try again later.";
        }
        else {
          errorMessage = "Something went wrong!!! Please try again.";
        }
        document.querySelector('.modal-errorInfo').innerHTML = errorMessage;
        modal.show(myModalEl);
        // Modal.show(myModalEl);
        // const myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
        // console.log(errorCode, errorMessage);
      });
      this.IsloggedInProcessing = false;

  }


  ngOnInit(): void {
    // function LoginFailed() {
    //   const myModalEl = document.getElementById('LoginFailed');
    //   Modal.show(myModalEl)
    // }
  }

}
