import { Component, OnInit } from '@angular/core';
import {TimetableControlService } from '../../service/timetable-control.service';

import {AuthService} from '../../service/auth.service';

import { map } from 'rxjs/operators';
import { Timetable } from 'src/app/shared/services/timetable';
import { User } from '../../shared/services/user';

import { NgForm } from '@angular/forms';
import data from '../../static/course.json';
@Component({
  selector: 'app-timetable-create',
  templateUrl: './timetable-create.component.html',
  styleUrls: ['./timetable-create.component.css']
})
export class TimetableCreateComponent implements OnInit {

 timetable: Timetable = new Timetable();
 submitted = false;
 CourseInfo: any = data;
 public returnValueTT = [];

  constructor(private timetableControlService: TimetableControlService, public authService: AuthService) { }

  ngOnInit() {
  }
  newTimetable(): void {
    this.submitted = false;
    this.timetable = new Timetable();
  }
  sanitization(value) {

    value = value.replace(/[&<>"'/*@?]/gi, "");

    return value
  }
 
  save() {
    this.timetable.uid = this.authService.userData.uid;
    this.timetableControlService.createTimetable(this.timetable);
    this.timetable = new Timetable();
  }
 
  onSubmit() {
    this.submitted = true;
    this.save();
  }

  checkForMatch(){
  //   const value = data.value;
  var headers = { 'Content-type': 'application/json' };

  let name = this.sanitization(this.timetable.name);
  let subjectCodeEntry = this.sanitization(this.timetable.subjectCodeEntry);
  let courseCodeEntry = this.sanitization(this.timetable.courseCodeEntry);
  subjectCodeEntry = subjectCodeEntry.toUpperCase();
  courseCodeEntry = courseCodeEntry.toUpperCase();

  console.log("Schedule Name: " + name);
  console.log("Subject Code: " + subjectCodeEntry);
  console.log("Course Code: " + courseCodeEntry);
    for (let i= 0; i < this.CourseInfo.length; i++) {
      if ((this.CourseInfo[i].subject==subjectCodeEntry) &&(this.CourseInfo[i].catalog_nbr ==courseCodeEntry ) ){
        console.log("success")
        this.returnValueTT.push({
          "course_info": this.CourseInfo[i]
         });
      this.onSubmit();
      }
      else{
        console.log("No Match was found");
      }
   //}
    // var body = JSON.stringify({ course_info: scheduleName, name: scheduleName, subjectCode: subjectCodeEntry, courseCode: courseCodeEntry });
    //     this.http.put('http://localhost:3000/api/schedules/codes', body, { headers }).subscribe(data => {
    //       console.log(data);
    //     },
    //       (error) => {
    //         console.log("EROOORR");
    //         console.log(error);
    //       })
  }
  }
  

}
