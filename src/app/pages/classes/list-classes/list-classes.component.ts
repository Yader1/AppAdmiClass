import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/models/class';
import { Filter } from 'src/app/models/Filter';
import { Student } from 'src/app/models/student';
import { AlertService } from 'src/app/service/alert.service';
import { SqliteServiceService } from 'src/app/service/sqlite-service.service';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.scss'],
})
export class ListClassesComponent implements OnInit {

  public classes: Class[];
  public showForm: boolean;
  public classSelected: Class;
  public students: Student[];
  public payments: Payment[];
  public filter: Filter;

  constructor(
    private sql:SqliteServiceService,
    private alertService: AlertService,
    private translate: TranslateService
  ) { 
    this.classes = [];
    this.students = [];
    this.payments = [];
    this.filter = new Filter();
  }

  ngOnInit() {
    this.getClasses();
  }

  getClasses(){
    Promise.all(
      [
        this.sql.getClasses(this.filter),
        this.sql.getStudents(),
        this.sql.getPayments()
      ]
    ).then(results => {
      this.classes = results[0];
      this.students = results[1];
      this.payments = results[2];
      this.associateStudentsClasess();
      this.associatePaymentClasess();
      console.log(this.classes);
    })
  }

  associateStudentsClasess(){
    this.classes.forEach(c => {
      let student = this.students.find(s => s.id === c.id_student);
      c.student = student;
    })
  }

  associatePaymentClasess(){
    this.payments.forEach(p => {
      let classFound = this.classes.find(c => c.id === p.id_class);
      if(classFound){
        classFound.needPay = p.paid === 0; 
      }
    })
  }

  closeForm(){
    this.showForm = false;
    this.classSelected = null;
    this.getClasses();
  }

  editClass(c: Class){
    this.classSelected = c;
    this.showForm = true;
  }

  removeClass(c: Class){
    this.sql.deleteClass(c).then(() => {
      this.alertService.alertSuccess(
        this.translate.instant('label.success'),
        this.translate.instant('label.success.message.remove.class')
      );
      this.getClasses();
    }).catch(error => console.error(error));
  }

  filterData($event){
    this.filter = $event;
    this.getClasses();
  }

  payClass(c: Class){
    this.sql.getPaymentByClass(c.id).then( p => {
      if(p){
        p.paid = 1;
        this.sql.updatePayment(p).then( () => {
          this.alertService.alertSuccess(
            this.translate.instant('label.success'),
            this.translate.instant('label.success.message.py.class')
          );

          this.getClasses();
        }).catch(error =>{
          console.error(error);
        });
      }
    }).catch(error =>{
      console.error(error);
    });
  }

}
