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
  @Input() payment: boolean; 
  public students: Student[];

  constructor(
    private sqliteManager: SqliteServiceService, private popoverController: PopoverController
  ) { 
    this.students = [];

  }

  ngOnInit() {

    if(this.filter.paid == null){
      this.filter.paid = false;
    }

    this.sqliteManager.getStudents().then(students => {
      this.students = students;
    })
  }

  cleanDates(){
    if(!this.filter.paid){
      this.filter.date_start = null;
      this.filter.date_end = null;
    }
  }

  filterData(){
    this.popoverController.dismiss(this.filter);
  }

  reset(){
    this.filter = new Filter();
    this.popoverController.dismiss(this.filter);
  }

}
