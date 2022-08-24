import { Component, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormGroup,FormControl } from "@angular/forms";
import { collection, setDoc } from '@firebase/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showForm = true;
  

  phatakForm = new FormGroup(
    {
      name: new FormControl(''),
      personInChargeName: new FormControl(''),
      personInChargePhone: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      phatakImage: new FormControl(''),
    }
  )

  constructor(private firestore: Firestore) { }


  addPhatakToFirebase(){
    console.log("executed");

    // let value = {...this.phatakForm.value};

    // value['phatakId'] = doc(collection(this.firestore,'Crossings')).id;

    // let docRef  = doc(this.firestore,'Crossings/'+ value['phatakId']);
    // setDoc(docRef, value)
    // .then(()=>{
    //   console.log('saved');
    //   this.phatakForm.reset();
    // }, (error)=>{
    //   console.log(error);
    // });
  }


  ngOnInit(): void {
    $(document).ready(function () {
    
      $('input[type=number]').on('mousewheel', function(e) {
        e.preventDefault();
      });
      $('input[type=number]').on('keydown', function(e) {
        if (e.keyCode == 38 || e.keyCode == 40){
           e.preventDefault();
         }
      });

    });
    
  }

}
