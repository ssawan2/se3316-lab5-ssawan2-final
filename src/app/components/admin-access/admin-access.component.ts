import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as admin from 'firebase-admin'
import { AuthService } from 'src/app/service/auth.service';

import { User } from "../../shared/services/user";
import { FormControl, FormGroup } from "@Angular/forms";
import { ReviewService } from 'src/app/service/review.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css']
})
export class AdminAccessComponent implements OnInit {

  constructor(public afs: AngularFirestore, private authService: AuthService, public reviewService: ReviewService) { }
  users: User[]
  reviews: any;
  returnArray: any [] = [];
  editState: boolean = false;
  userToEdit: User
display = false;
  
  ngOnInit(): void {
    this.afs
    .collection("users")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
      this.returnArray.push(doc.data());
    });
    this.getReviewList();
  });
  }
  form = new FormGroup({
    newValue: new FormControl('')
  })
  editUser(user){
    this.editState = true;
    this.userToEdit = user;
    
  }
  onSubmit() {
    this.afs.collection('users').add({
      siteManager: this.form.value.true
    })
    .then(res => {
        console.log(res);
        this.form.reset();
    })
    .catch(e => {
        console.log(e);
    })
  }
  getReviewList(){
    this.reviewService.getReviewList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(reviews => {
      this.reviews = reviews;
    });
  }



}
