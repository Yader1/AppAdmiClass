import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class';
import { Filter } from 'src/app/models/Filter';
import { Student } from 'src/app/models/student';
import { Payment } from 'src/app/models/payment';
import { SqliteServiceService } from 'src/app/service/sqlite-service.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
})
export class ListPaymentComponent implements OnInit {

  public payments: Payment[];
  public classes: Class[];
  public students: Student[];
  public total: number;
  public filter: Filter;

  constructor(private sqliteManager: SqliteServiceService) {
    this.payments = [];
    this.classes = [];
    this.students = [];
    this.total = 0;
    this.filter = new Filter();
   }

  ngOnInit() {}

  getPayments(){

  }

  filterData(){
    
  }

}
