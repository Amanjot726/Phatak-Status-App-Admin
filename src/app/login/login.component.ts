import { Component, NgZone, OnInit } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { DbService } from '../services/db.service';
// import Modal from "bootstrap/js/src/modal";
import { Modal } from 'bootstrap';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';

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
  IsAdmin = false;
  IsloggedInProcessing = false;

  async getLoggedInStatus() {
    this.dbService.IsLoggedIn.subscribe((data) => {
      this.IsLoggedIn = data;
      if (this.IsLoggedIn) {
        this.ngZone.run(() => this.router.navigate(['/']));
      }
    });
  }

  constructor(private dbService: DbService, private router: Router, private ngZone: NgZone, private firestore: Firestore) {
    this.getLoggedInStatus();

  }


  input(input:any) {
		return this.LoginForm.get(input);
	}

  HandleGuestLogin(){
    this.dbService.IsGuest.next(true);
    this.dbService.IsLoggedIn.next(true);
    this.dbService.IsWrongUrl.next(false);
    this.dbService.IsAdmin.next(false);
    this.ngZone.run(() => this.router.navigate(['/']));
  }

  HandleLogin(){
    if (this.LoginForm.invalid){
      this.LoginForm.markAllAsTouched();
      return;
    }
    this.IsloggedInProcessing = true;
    setTimeout(() => {
      this.Login();
    }, 500);
  }

  Login() {
    const myModalEl = document.getElementById('LoginFailed');
    const modal = new Modal(myModalEl);
    if (this.LoginForm.invalid){
      this.LoginForm.markAllAsTouched();
      return;
    }
    signInWithEmailAndPassword(this.dbService.auth, this.LoginForm.get('Username')?.value, this.LoginForm.get('Password')?.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        onSnapshot(doc(this.firestore, "Users", user), (doc) => {
          this.dbService.IsAdmin.next(doc.data()?.["isAdmin"]);
          if (doc.data()?.["isAdmin"]) {
            this.IsAdmin = true;
            this.dbService.IsLoggedIn.next(true);
            console.log("Redirecting to Home by login component");
            this.ngZone.run(() => this.router.navigate(['/']));
          }
          else{
            this.IsAdmin = false;
            signOut(this.dbService.auth).then(() => {}).catch((error) => {
              console.log(error);
            });
            let errorMessage = "Don't have Admin Privileges. Please try again with a different account or Login as a Guest";
            document.querySelector('.modal-erorr').innerHTML = "Login Failed";
            document.querySelector('.modal-errorInfo').innerHTML = errorMessage;
            modal.show(myModalEl);
          }
        });
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
        document.querySelector('.modal-erorr').innerHTML = "Login Failed";
        document.querySelector('.modal-errorInfo').innerHTML = errorMessage;
        modal.show(myModalEl);
      });
      setTimeout(() => {
        this.IsloggedInProcessing = false;
      }, 700);

  }


  ngOnInit(): void {
    // function LoginFailed() {
    //   const myModalEl = document.getElementById('LoginFailed');
    //   Modal.show(myModalEl)
    // }
  }

}
