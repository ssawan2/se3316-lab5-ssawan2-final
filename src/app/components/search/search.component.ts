
import { Component, OnInit } from '@angular/core';
import data from '../../static/course.json';
import subData from '../../static/Lab5-subject-data.json';
import {TimetableControlService } from '../../service/timetable-control.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private timetableControlService: TimetableControlService) { }
  CourseInfo: any = data;
  SubjectData: any = subData;

  public subject: String;

  public subjectCode: String;
  public courseCode: String;
  public inComp: String;
  public returnValue = [];

  public returnValueTT = [];
  public rV = [];

  show = false;
  display = false;
  public keyword: String;

  timetables: any;

  ngOnInit(): void {
    this.getTimetableList();
  }
  sanitization(value) {

    value = value.replace(/[&<>"'/*@?]/gi, "");

    return value
  }
  searchForCourses() {
    const subj = this.subject.toUpperCase();

    var ssubj = this.sanitization(subj);
    console.log(ssubj);
    for (let i = 0; i < this.CourseInfo.length; i++) {
      if (this.CourseInfo[i].subject.includes(ssubj)) {
        this.returnValue.push({
          "courseCode": this.CourseInfo[i].catalog_nbr
        });

      
    }}
    console.log(this.returnValue);
  }
  
  getTimetable() {
    let sc = this.sanitization(this.subjectCode);
    sc = sc.toUpperCase();
    let ccode = this.sanitization(this.courseCode);
    ccode = ccode.toUpperCase();
    let ccomponent = this.inComp;

    if (ccomponent == undefined) {
      ccomponent = "ALL";
    }
    let sccomponent = this.sanitization(ccomponent);

    for (let i = 0; i < this.CourseInfo.length; i++) {
      if ((this.CourseInfo[i].subject == sc) && (this.CourseInfo[i].catalog_nbr == ccode)) {
        if (sccomponent == "ALL") {
          this.returnValueTT.push({
            "course_info": this.CourseInfo[i]
          });
        } else {
          for (let k = 0; k < this.CourseInfo[i].course_info.length; k++) {
            if (sccomponent === this.CourseInfo[i].course_info[k].ssr_component) {
              this.returnValueTT.push({
                "course_info": this.CourseInfo[i].course_info
              });
            }
          }
        }
      }
    }
    console.log(this.returnValueTT);
  }
  searchByKeywords() {

    let keyword = this.sanitization(this.keyword);
    keyword = keyword.toUpperCase();

    console.log(keyword);
    if (keyword.length > 3) {
      for (let i = 0; i < this.CourseInfo.length; i++) {
        if ((this.CourseInfo[i].subject == keyword)) {
          this.returnValue.push({
            "course_info": this.CourseInfo[i].course_info
          });
        }
      }
    }
    else {
      console.log("Error");
    }
    console.log(this.returnValue);
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
}

