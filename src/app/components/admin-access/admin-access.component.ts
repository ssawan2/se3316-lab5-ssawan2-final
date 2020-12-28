import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as admin from 'firebase-admin'
import { AuthService } from 'src/app/service/auth.service';

import { User } from "../../shared/services/user";
import { FormControl, FormGroup } from "@Angular/forms";
@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css']
})
export class AdminAccessComponent implements OnInit {

  constructor(public afs: AngularFirestore, private authService: AuthService) { }
  users: User[]
  returnArray: any [] = [];
  editState: boolean = false;
  userToEdit: User

  
  ngOnInit(): void {
    this.afs
    .collection("users")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
      this.returnArray.push(doc.data());
    });
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
  



}
