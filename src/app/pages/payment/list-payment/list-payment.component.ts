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

  ngOnInit() {
    this.getPayments();
  }

  getPayments(){
    Promise.all(
      [
        this.sqliteManager.getPayments(this.filter),
        this.sqliteManager.getClasses(),
        this.sqliteManager.getStudents()
      ]
    ).then(results => {
      this.payments = results[0];
      console.log(this.payments);
      this.classes = results[1];
      this.students = results[2];

      this.associateObjects();
      this.calculateTotal();
    })
  }

  associateObjects(){
    this.payments.forEach(p => {
      p.class = this.classes.find(c => c.id == p.id_class);

      if(p.class){
        p.class.student = this.students.find(s => s.id === p.class.id_student);
      }
    })
  }

  calculateTotal(){
    let total = 0;

    this.payments.forEach(p => {
      total += p.class.price;
    });

    this.total = total;
  }

  filterData(){
    
  }

}
