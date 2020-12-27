import { Component, OnInit } from '@angular/core';
import {TimetableControlService } from '../../service/timetable-control.service';

import { map } from 'rxjs/operators';
import { Timetable } from 'src/app/shared/services/timetable';
@Component({
  selector: 'app-timetable-create',
  templateUrl: './timetable-create.component.html',
  styleUrls: ['./timetable-create.component.css']
})
export class TimetableCreateComponent implements OnInit {

 timetable: Timetable = new Timetable();
 submitted = false;

  constructor(private timetableControlService: TimetableControlService) { }

  ngOnInit() {
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

  

}
