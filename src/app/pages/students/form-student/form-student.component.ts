import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Student } from 'src/app/models/student';
import { AlertService } from 'src/app/service/alert.service';
import { SqliteServiceService } from 'src/app/service/sqlite-service.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
})
export class FormStudentComponent implements OnInit {

  @Input() student: Student;
  public edit: boolean;

  @Output() close: EventEmitter<boolean>;

  constructor(
    private sql:SqliteServiceService,
    private alertService: AlertService,
    private translate: TranslateService
  ) { 
    this.edit = false;
    this.close = new EventEmitter<boolean>();
  }

  ngOnInit() {
    if(!this.student){
      this.student = new Student();
    }else{
      this.edit = true;
    }
  }

  addEditStudent(){
    if(this.edit){
      this.sql.updateStudent(this.student).then( () =>{
        console.log('Se ha actualizado');
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.edit.student')
        )
        this.closeForm();
      })
    }else{ 
      this.sql.createStudents(this.student).then( ()=> {
        console.log('Se ha insertado');
        this.alertService.alertSuccess(
          this.translate.instant('label.success'),
          this.translate.instant('label.success.message.add.student')
        )
        this.closeForm();
      })
    }
  }

  closeForm() {
    this.close.emit(true);
  }

}
