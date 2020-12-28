import { Injectable, NgZone } from '@angular/core';
import { User } from "../shared/services/user";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
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

  // Sign in with email/password
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

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SendVerificationMail();
        this.SetUserData(result.user);
        
        this.SettingAdmin(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }  

  // Auth logic to run auth providers
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
      // active: user.active,
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  SettingAdmin(user){
    
    if(user.email == "master@mail.com"){
      console.log("hello it got here")
      this.afs.collection("users/").doc(`${user.uid}`)
      .update({ admin: true })
      .then(function() {
       console.log("Document successfully updated!");
   })
   .catch(function(error) {
       console.error("Error updating document: ", error);
   });
     }
  }

  // SettingSiteManager(user){
  //   if(user.admin == true){
  //     const docRef = this.afs.collection('users', ref => ref
  //     .where("siteManager", "==", this.secondForm.value.valueToGet));
  //   }
  // }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}