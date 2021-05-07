import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { SqliteServiceService } from 'src/app/service/sqlite-service.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {

  public students: Student[];
  public studentsSelected: Student;
  public showForm: boolean;

  constructor(private sqlite: SqliteServiceService) {
    this.students = []; 
    this.showForm = false;
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(search?: string){
    this.sqlite.getStudents(search).then(students => {
      this.students = students;
      console.log(students);
    })
  }

  closeForm(){
    this.showForm = false;
    this.studentsSelected = null;
    this.getStudents();
  }

  editStudent(student: Student){
    this.studentsSelected = student;
    this.showForm = true;
  }

  filterList($event){
    console.log($event);
    this.getStudents($event.currentTarget.value);
  }

}
