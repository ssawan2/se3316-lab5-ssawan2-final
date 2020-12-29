import { Injectable, NgZone } from '@angular/core';
import { User } from "../shared/services/user";


import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

import '@firebase/auth';

import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root'
})
//tutorial used: https://www.remotestack.io/angular-firebase-authentication-example-tutorial/
export class AuthService {
  userData: any; 
  constructor(
    public afs: AngularFirestore,  
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
        this.SettingAdmin(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
        
        this.SettingAdmin(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  
GoogleAuth() {
  return this.AuthLogin(new firebase.auth.GoogleAuthProvider());  
  }  

  
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
      this.SettingAdmin(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      admin: user.admin = false,
      siteManager: user.siteManager = false,
      active: user.active  =true,
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  SettingAdmin(user){
    
    if(user.email == "master@mail.com"){
      this.afs.collection("users/").doc(`${user.uid}`)
      .update({ admin: true })
      .then(function() {
       console.log("updated!");
   })
   .catch(function(error) {
       console.error("Error : ", error);
   });
     }
  }

  SettingSiteManager(user){
      this.afs.collection("users/").doc(`${user.siteManager}`)
      .update({ admin: true })
      .then(function() {
       console.log("updated!");

   })
   .catch(function(error) {
       console.error("Error: ", error);
   });
  }
 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['email-verification']);
    })
}    

ForgotPassword(passwordResetEmail) {
  return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
  .then(() => {
    window.alert('Check inbox, email was resent');
  }).catch((error) => {
    window.alert(error)
  })
}
}