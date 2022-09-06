import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { deleteDoc, doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { FormGroup,FormControl, FormArray, FormRecord, Validators } from "@angular/forms";
import { collection, setDoc } from '@firebase/firestore';
import * as $ from 'jquery';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showForm = false;
  le = Number(0);

  // location =

  phatakForm = new FormGroup(
    {
      phatakName: new FormControl('',[Validators.required, Validators.minLength(10)]),
      phatakId: new FormControl(''),
      personInChargeName: new FormControl(''),
      personInChargePhone: new FormControl(null),
      phatakStatus: new FormControl(''),
      trafficStatus: new FormControl(''),
      // latitude: new FormControl(''),
      // longitude: new FormControl(''),
      imageURL: new FormControl(''),
      location: new FormGroup({
        latitude: new FormControl(''),
        longitude: new FormControl(''),
      }),
      timings: new FormArray([])
    }
  );

  input(input:any) {
    return this.phatakForm.get(input);
  }

  tempImage: any = null;

  phataksList: any[] = [];

  constructor(private firestore: Firestore, private dbService: DbService) { }

  async setphataksList() {
    // this.DbService.getPhataks();
    this.dbService.phataksList.subscribe((data) => {
      // this.phataksList = data;
      if(data.length > 0) {
        this.phataksList = data;
      }
    })
  }

  ngOnInit(): void {
    this.setphataksList();

    // $(document).ready(function () {
    //   $('input[type=number]').on('mousewheel', function(e) {
    //     this.blur();
    //     // e.preventDefault();
    //   });
    //   $('input[type=number]').on('keydown', function(e) {
    //     if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 69){
    //        e.preventDefault();
    //      }
    //   });
    // });
  }


  async addPhatakToFirebase(){
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
    if (this.phatakForm.invalid){
      this.phatakForm.markAllAsTouched();
      return;
    }
  }

  getTimingsArrayFromPhatakForm() {
    return this.phatakForm.get('timings') as FormArray;
  }

  addTimingDetailsToArray() {
    this.getTimingsArrayFromPhatakForm().push(new FormGroup({
      time: new FormControl(null),
      trafficStatus: new FormControl(''),
      train: new FormControl('')
    }))
  }

  removeTimingDetailsToArray(idx: number) {
    this.getTimingsArrayFromPhatakForm().removeAt(idx);
  }

  selectImage(event) {
    console.log(">>> Files: ", event.target.files);
    this.tempImage = event.target.files[0];
  }


  updatePhatak(phatak: any) {
    this.showForm = true;
    let datepipe = new DatePipe('en-US');
    this.phatakForm = new FormGroup({
      phatakName: new FormControl(phatak.phatakName),
      personInChargeName: new FormControl(phatak.personInChargeName),
      personInChargePhone: new FormControl(Number(phatak.personInChargePhone.length == 0 ? 0 : phatak.personInChargePhone.split(" ")[1])),
      location: new FormGroup({
        latitude: new FormControl(phatak.location['latitude']),
        longitude: new FormControl(phatak.location['longitude']),
      }),
      // latitude: new FormControl(phatak.location[0]),
      // longitude: new FormControl(phatak.location[1]),
      imageURL: new FormControl(phatak.imageURL==""? '': ''),
      phatakId: new FormControl(phatak.phatakId),
      phatakStatus: new FormControl(phatak.phatakStatus),
      trafficStatus: new FormControl(phatak.trafficStatus),
      timings: new FormArray(phatak.timings.length === 0 ? [] : phatak.timings.map(element => new FormGroup({
        time: new FormControl(datepipe.transform(element.time.toDate(), 'yyyy-MM-dd HH:mm')),
        trafficStatus: new FormControl(element.trafficStatus),
        train: new FormControl(element.train)
      })))
    });
  }

  deletePhatak(phatakId: string) {
    let docRef = doc(this.firestore, "phataks/" + phatakId);
    deleteDoc(docRef).then(() => {
      console.log("Delete Successfully");
    })
    .catch((error) => {
      console.log(error);
    })
  }

}
