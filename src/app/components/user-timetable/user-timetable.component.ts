import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { User } from "../../shared/services/user";
import { Timetable} from '../../shared/services/timetable';
import data from '../../static/course.json';

import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';


import {TimetableControlService } from '../../service/timetable-control.service';
@Component({
  selector: 'app-user-timetable',
  templateUrl: './user-timetable.component.html',
  styleUrls: ['./user-timetable.component.css']
})
export class UserTimetableComponent implements OnInit {
  public numberOfSchedules = 0;
  private basePath: string = '/timetables'
  @Input() timetable: Timetable;
  timetables: any;
  CourseInfo: any = data;
  public returnValueTT = [];

  submitted = false;

  
  constructor(public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private http: HttpClient,
    private timetableControlService: TimetableControlService) { }

  ngOnInit(): void {
    
    this.getTimetableList();
  }
  sanitization(value) {

    value = value.replace(/[&<>"'/*@?]/gi, "");

    return value
  }
  // createTimetable(user){
  //   if(this.numberOfSchedules<21){
  //     var headers = { 'Content-type': 'application/json' };
  //     var sn = this.sanitization(user.scheduleName);
  //     var body = JSON.stringify({ name: sn });
  
  //     this.http.post('http://localhost:3000/api/schedules', body, { headers }).subscribe(data => {
  //       console.log(data);
  //     },
  //       (error) => {
  //         console.log(error);
  //       })

  //   this.numberOfSchedules ++;
  //       console.log(this.numberOfSchedules);  }
  //   else{
  //     console.log("Max 20 differet Schedules");
  //   }
  // }

  updateActive(isActive: boolean) {
    this.timetableControlService
      .updateTimeTable(this.timetable.key, { active: isActive })
      .catch(err => console.log(err));
  }
  deleteTimetable() {
    this.timetableControlService
      .deleteTimetable(this.timetable.key)
      .catch(err => console.log(err));
  }
  newTimetable(): void {
    this.submitted = false;
    this.timetable = new Timetable();
  }
 
  save() {
    this.timetableControlService.createTimetable(this.timetable);
    this.timetable = new Timetable();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }
  getTimetableList(){
    this.timetableControlService.getTimetableList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(timetables => {
      this.timetables = timetables;
    });
  }
  addToTimetable(data: NgForm){
    const value = data.value;
    var headers = { 'Content-type': 'application/json' };

    let scheduleName = this.sanitization(value.scheduleName);
    let subjectCodeEntry = this.sanitization(value.sc);
    let courseCodeEntry = this.sanitization(value.cc);
    subjectCodeEntry = subjectCodeEntry.toUpperCase();
    courseCodeEntry = courseCodeEntry.toUpperCase();

    console.log("Schedule Name: " + scheduleName);
    console.log("Subject Code: " + subjectCodeEntry);
    console.log("Course Code: " + courseCodeEntry);
    for (let i= 0; i < this.CourseInfo.length; i++) {
      if ((this.CourseInfo[i].subject==subjectCodeEntry) &&(this.CourseInfo[i].catalog_nbr ==courseCodeEntry ) ){
        console.log("success")
        this.returnValueTT.push({
          "course_info": this.CourseInfo[i]
         });
        
      }
      else{
        console.log("No Match was found");
      }
    }
    var body = JSON.stringify({ course_info: scheduleName, name: scheduleName, subjectCode: subjectCodeEntry, courseCode: courseCodeEntry });
        this.http.put('http://localhost:3000/api/schedules/codes', body, { headers }).subscribe(data => {
          console.log(data);
        },
          (error) => {
            console.log("EROOORR");
            console.log(error);
          })



    
  }

}
