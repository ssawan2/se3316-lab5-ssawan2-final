import { Component, Input, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { Timetable } from 'src/app/shared/services/timetable';


import {TimetableControlService } from '../../service/timetable-control.service';


@Component({
  selector: 'app-timetable-details',
  templateUrl: './timetable-details.component.html',
  styleUrls: ['./timetable-details.component.css']
})
export class TimetableDetailsComponent implements OnInit {

  @Input() timetable: Timetable;

  constructor(private timetableControlService: TimetableControlService) { }

  ngOnInit(): void {
  }
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


}
