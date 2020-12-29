import { Component, Input, OnInit } from '@angular/core';
import { Timetable } from 'src/app/shared/services/timetable';
import {TimetableControlService } from '../../service/timetable-control.service';


@Component({
  selector: 'app-timetable-details',
  templateUrl: './timetable-details.component.html',
  styleUrls: ['./timetable-details.component.css']
})
export class TimetableDetailsComponent implements OnInit {

  @Input() timetable: Timetable;
  edit: boolean;
  constructor(private timetableControlService: TimetableControlService) { }

  ngOnInit(): void {
  }
  updateActive(isActive: boolean) {
    this.timetableControlService
      .updateTimeTable(this.timetable.key, { active: isActive })
      .catch(err => console.log(err));
  }
  updateEdit(isEdit: boolean) {
    this.timetableControlService
      .updateTimeTable(this.timetable.key, { edit: isEdit })
      .catch(err => console.log(err));
    console.log(isEdit);
  }

 
  deleteTimetable() {
    this.timetableControlService
      .deleteTimetable(this.timetable.key)
      .catch(err => console.log(err));
  }

  editTimetable() {
    this.timetableControlService
      .updateTimeTable (this.timetable.key, 
        {
          name: this.timetable.name, 
          courseCodeEntry: this.timetable.courseCodeEntry, 
          subjectCodeEntry: this.timetable.subjectCodeEntry
        })
      .catch(err => console.log(err));
  }


}
