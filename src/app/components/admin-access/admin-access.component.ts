import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as admin from 'firebase-admin'

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css']
})
export class AdminAccessComponent implements OnInit {

  constructor(public afs: AngularFirestore, ) { }
returnArray: any [] = [];
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

  SettingSiteManagers(user){
    
  }




}
