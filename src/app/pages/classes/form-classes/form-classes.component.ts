import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/models/class';
import { Student } from 'src/app/models/student';
import { AlertService } from 'src/app/service/alert.service';
import { SqliteServiceService } from 'src/app/service/sqlite-service.service';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-form-classes',
  templateUrl: './form-classes.component.html',
  styleUrls: ['./form-classes.component.scss'],
})
export class FormClassesComponent implements OnInit {

  @Input() classObj: Class;
  public payment: Payment;
  public edit:boolean;
  public students: Student[];
  public paid: boolean;

  @Output() close: EventEmitter<boolean>;

  constructor(
    private sql: SqliteServiceService,
    private alertService: AlertService,
    private translate: TranslateService
  ) { 
    this.close = new EventEmitter<boolean>();
    this.students = [];
    this.paid = false;
  }

  ngOnInit() {

    if(!this.classObj){
      this.classObj = new Class();
      this.payment = new Payment();
      this.classObj.price = 0;
      this.edit = false;
    }else{
      this.edit = true;
    }

    this.sql.getStudents().then(students => {
       this.students = students;
    })
  }

  closeForm(){
    this.close.emit(true);
  }

  addEditClass(){
    if(this.edit){
      this.sql.updateClass(this.classObj).then(c => {
        console.log(c)
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.edit.class')
        );
        this.closeForm();
      })

    }else{
      this.sql.createClass(this.classObj).then(c => {
        console.log(c)
        this.payment.id_class = c.insertId;
        this.payment.paid = this.paid ? 1 : 0;
        this.sql.createPayment(this.payment);

        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.add.class')
        );
        this.closeForm();
      });
    }
  }
}
