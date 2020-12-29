import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../service/auth.service';
import {User} from '../../shared/services/user'
import { Injectable, NgZone } from '@angular/core';


import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any; 
  admin = false;
  constructor(public authService: AuthService,
    
    public afAuth: AngularFireAuth, 
    public afs: AngularFirestore, ) { }

  ngOnInit(): void {
  }
check(user){
  if(user.email == "master@mail.com"){
    return true;
  }

}
  
  }
