import { Component, OnInit } from '@angular/core';
import {TimetableControlService } from '../../service/timetable-control.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {

  timetables: any;

  constructor(private timetableControlService: TimetableControlService) { }

  ngOnInit(): void {
    
    this.getTimetableList();
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
  deleteTimetables() {
    this.timetableControlService.deleteAll().catch(err => console.log(err));
  }

}
