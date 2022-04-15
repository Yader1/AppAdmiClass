import { Component, Input, OnInit } from '@angular/core';
import { Filter } from './../../../models/Filter';
import { SqliteServiceService } from '../../../service/sqlite-service.service';
import { Student } from 'src/app/models/student';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent implements OnInit {

  @Input() filter: Filter;
  public students: Student[];

  constructor(
    private sqliteManager: SqliteServiceService, private popoverController: PopoverController
  ) { 
    this.students = [];
  }

  filterData(){
    this.popoverController.dismiss(this.filter);
  }

  ngOnInit() {
    this.sqliteManager.getStudents().then(students => {
      this.students = students;
    })
  }

}
