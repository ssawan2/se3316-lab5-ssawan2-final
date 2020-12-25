
import { Component, OnInit } from '@angular/core';
import data from '../../static/course.json';
import subData from '../../static/Lab5-subject-data.json';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }
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
  public keyword: String;

  ngOnInit(): void {
  }
  sanitization(value) {

    value = value.replace(/[&<>"'/*@?]/gi, "");

    return value
  }
  searchForCourses() {
    const subj = this.subject;
    var ssubj = this.sanitization(subj);
    console.log(ssubj);
    for (let i = 0; i < this.CourseInfo.length; i++) {
      if (this.CourseInfo[i].subject == ssubj) {
        this.returnValue.push({
          "courseCode": this.CourseInfo[i].catalog_nbr
        });

      }
    }
    console.log(this.returnValue);
  }
  searchByKeywords() {
    var txtValue, a, b, txtValueb;
    //let keyword = this.keyword.toUpperCase();

    let keyword = this.sanitization(this.keyword);
    keyword = keyword.toUpperCase();

    console.log(keyword);
    // var skeyword = this.sanitization(keyword);
    if (keyword.length > 3) {
      console.log(keyword.length);
      for (let i = 0; i < this.CourseInfo.length; i++) {
        if ((this.CourseInfo[i].subject == keyword) || (this.CourseInfo[i].catalog_nbr == keyword)) {
          //|| this.CourseInfo[i].catalog_nbr  == skeyword
          console.log("MATCH");
          this.rV.push({
            "course_info": this.CourseInfo[i].course_info
          })
        }

      }
      console.log("2:" + this.rV);
    }
    else {
      console.log("Error");

    }

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
}
