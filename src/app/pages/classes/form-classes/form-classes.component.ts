import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Class } from 'src/app/models/class';
import { Student } from 'src/app/models/student';
import { AlertService } from 'src/app/service/alert.service';
import { SqliteServiceService } from 'src/app/service/sqlite-service.service';

@Component({
  selector: 'app-form-classes',
  templateUrl: './form-classes.component.html',
  styleUrls: ['./form-classes.component.scss'],
})
export class FormClassesComponent implements OnInit {

  @Input() classObj: Class;
  public edit:boolean;
  public students: Student[];

  @Output() close: EventEmitter<boolean>;

  constructor(
    private sql: SqliteServiceService,
    private alertService: AlertService,
    private translate: TranslateService
  ) { 
    this.close = new EventEmitter<boolean>();
    this.students = [];
  }

  ngOnInit() {

    if(!this.classObj){
      this.classObj = new Class();
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
      this.sql.createClass(this.classObj).then(() =>{
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.add.class')
        );
        this.closeForm();
      })
    }
    
  }

}
