import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Timetable} from '../shared/services/timetable';

@Injectable({
  providedIn: 'root'
})
export class TimetableControlService {

  private dbPath = '/timetableCreating';

  timetableRef: AngularFireList<Timetable> = null;


 constructor(private db: AngularFireDatabase) {
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
}
