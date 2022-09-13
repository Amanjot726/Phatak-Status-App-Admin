import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { deleteDoc, doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormGroup,FormControl, FormArray, FormRecord, Validators } from "@angular/forms";
import { collection, setDoc, Timestamp } from '@firebase/firestore';
import * as $ from 'jquery';
import { DbService } from '../services/db.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	showForm = true;
  updateData = false;
	le = Number(0);

	// location =

	phatakForm = new FormGroup({
		phatakName: new FormControl('',[Validators.required, Validators.minLength(10)]),
		phatakId: new FormControl(''),
		personInChargeName: new FormControl('', [Validators.required]),
		personInChargePhone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
		phatakStatus: new FormControl('', [Validators.required]),
		trafficStatus: new FormControl('', [Validators.required]),
		// latitude: new FormControl(''),
		// longitude: new FormControl(''),
		imageURL: new FormControl(''),
		location: new FormGroup({
			latitude: new FormControl('', [Validators.required, Validators.pattern("^[+-]?(([1-8]?[0-9])(\.[0-9]{1,6})?|90(\.0{1,6})?)$")]),
			longitude: new FormControl('', [Validators.required, Validators.pattern("^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,6})?)|180(\.0{1,6})?)$")]),
		}),
		timings: new FormArray([])
	});


	tempImage: any = null;
	phataksList: any[] = [];

	constructor(private firestore: Firestore, private dbService: DbService, private storage: Storage) { }

	async setphataksList() {
		// this.DbService.getPhataks();
		this.dbService.phataksList.subscribe((data) => {
		// this.phataksList = data;
		if(data.length > 0) {
			this.phataksList = data;
		}
		})
	}

	async addPhatakToFirebase(){
		console.log("executed");

		if (this.phatakForm.invalid){
		this.phatakForm.markAllAsTouched();
		return;
		}

		let value:any = {...this.phatakForm.value};
		let phatakInfo = {
		phatakId: value?.phatakId?.length === 0 ? doc(collection(this.firestore, "Crossings")).id : value.phatakId,
		location: value.location,
		phatakName: value.phatakName,
		personInChargeName: value.personInChargeName,
		personInChargePhone: "+91 "+value.personInChargePhone,
		phatakStatus: value.phatakStatus,
		trafficStatus: value.trafficStatus,
		timings: value.timings.map(e => ({
			trafficStatus: e.trafficStatus,
			train: e.train,
			time: Timestamp.fromDate(new Date(e.time))
		})),
		imageURL: value.imageURL
		}

		// ============= Set the image to firebase storage ================
		if(this.tempImage != null) {
			// console.log("this.tempImage.name = ",this.tempImage.name)
			let storageRef = ref(this.storage, "Crossings/" + this.tempImage.name)
			await uploadBytes(storageRef, this.tempImage);
			phatakInfo.imageURL = await getDownloadURL(storageRef);
		}

		// ============= Save the phatak to firebase ================
		let docRef  = doc(this.firestore,'Crossings/'+ phatakInfo.phatakId);
		setDoc(docRef, phatakInfo).then(
		()=>{
      console.log('saved');
			this.phatakForm.reset();
			if (this.updateData) {
				this.updateData = false;
			}
      this.getTimingsArrayFromPhatakForm().clear();
			this.showForm = false;
		},
		(error)=>{
			console.log(error);
		});
  	}




	updatePhatak(phatak: any) {
		this.showForm = true;
		let datepipe = new DatePipe('en-US');
		this.phatakForm = new FormGroup({
			phatakId: new FormControl(phatak.phatakId),
			phatakName: new FormControl(phatak.phatakName),
			personInChargeName: new FormControl(phatak.personInChargeName),
			// personInChargePhone: new FormControl(phatak.personInChargePhone),
			personInChargePhone: new FormControl(phatak.personInChargePhone.length == 0 ? 0 : phatak.personInChargePhone.split(" ")[1]),
			location: new FormGroup({
        latitude: new FormControl(phatak.location['latitude']),
        longitude: new FormControl(phatak.location['longitude']),
			}),
			phatakStatus: new FormControl(phatak.phatakStatus),
			trafficStatus: new FormControl(phatak.trafficStatus),
			imageURL: new FormControl(phatak.imageURL),
			timings: new FormArray(phatak.timings.length === 0 ? [] : phatak.timings.map(element => new FormGroup({
        time: new FormControl(datepipe.transform(element.time.toDate(), 'yyyy-MM-dd HH:mm')),
        trafficStatus: new FormControl(element.trafficStatus),
        train: new FormControl(element.train)
			})))
		});
    this.updateData = true;
    // this.tempImage = phatak.imageURL;
	}

	deletePhatak(phatakId: string) {
		console.log('phatakId',phatakId);
		let docRef = doc(this.firestore, "Crossings/" + phatakId);
		deleteDoc(docRef).then(() => {
			console.log("Delete Successfully");
		})
		.catch((error) => {
			console.log(error);
		})
	}



  	// Helper Functions
	input(input:any) {
    // this.phatakForm.get('location'['latitude'])
		return this.phatakForm.get(input);
	}

  ResetForm(){
    this.phatakForm.reset();
    this.getTimingsArrayFromPhatakForm().clear();
    this.updateData = false;
  }

	checkValidity(input:any) {
		// input('phatakName')?.invalid && (input('phatakName').dirty || input('phatakName').touched)
		// if (this.input(input)?.invalid && (this.input(input).dirty || this.input(input).touched)) {
		//   return true;
		// }
		// return false;
		// let result =
		return this.phatakForm.get(input)?.invalid && this.phatakForm.get(input)?.dirty || this.phatakForm.get(input)?.touched;
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




	ngOnInit(): void {
		this.setphataksList();

		$(document).ready(function () {
		  // $('input[type=number]').on('mousewheel', function(e) {
		  //   this.blur();
		  //   // e.preventDefault();
		  // });
      $('input[type=number]').on('keydown', function(e) {
		    if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 69) {
		      e.preventDefault();
		     }
		  });
		  $('input[id=personInChargePhone]').on('keydown', function(e) {
		    if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 69 || e.keyCode == 189 || e.keyCode == 187 || e.keyCode == 190 || e.keyCode == 109 || e.keyCode == 107 || e.keyCode == 110) {
		      e.preventDefault();
		     }
		  });
		});
	}

}
