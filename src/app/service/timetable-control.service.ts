import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import {Timetable} from '../shared/services/timetable';
import {User} from '../shared/services/user';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TimetableControlService {

  private dbPath = '/timetable';

  timetableRef: AngularFireList<Timetable>;

  userId: string;

 constructor(private db: AngularFireDatabase, private afAuth:AngularFireAuth,public afs: AngularFirestore ) {
    
  this.timetableRef = db.list(this.dbPath);
  }

  
  createTimetable(timetable: Timetable): void {
    this.timetableRef.push(timetable);
  }

  updateTimeTable(key: string, value:any): Promise<void>{
  return this.timetableRef.update(key,value);
  }
  deleteTimetable(key: string): Promise<void> {
    return this.timetableRef.remove(key);
  }
 
  getTimetableList(): AngularFireList<Timetable> {
    return this.timetableRef;
  }
 
  deleteAll(): Promise<void> {
    return this.timetableRef.remove();
  }

  // getTimetablelist(): AngularFireObject<Timetable[]>{
  //     if(!this.userId)return;
  //      this.timetables = this.db.list(`item/${this.userId}`);
  //      return this.timetables
  // }

  // createTimetable(timetable: Timetable): void{
  //   timetable.userId = timetable.userId
  //   this.timetables.push(timetable)
  // }
  
}
