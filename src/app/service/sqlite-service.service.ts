import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class SqliteServiceService {

  db: SQLiteObject = null;

  constructor(private sqlite: SQLite) { }

  createDatabase(){
    return this.sqlite.create({
      name: 'class.db',
      location: 'default'
    }).then( (db: SQLiteObject) => {
      this.db = db;

      let sqlTableAlumnos = 'CREATE TABLE IF NOT EXISTS "students" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `surname` TEXT, `email` TEXT NOT NULL, `phone` TEXT NOT NULL, `active` INTEGER DEFAULT 1 );';
      let sqlDelAlumnos = 'DELETE FROM students;';

      let sqlAli1 = "INSERT INTO students VALUES (1, 'Fer', 'Ure', 't1@t.com', '123456', 1);";
      let sqlAli2 = "INSERT INTO students VALUES (2, 'Nando', 'Ure', 't2@t.com', '654321', 1);";
      let sqlAli3 = "INSERT INTO students VALUES (3, 'Ricardo', 'Hervas', 't2@t.com', '159753', 1);";

      let sqlTableClass = 'CREATE TABLE IF NOT EXISTS "class" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date_start` TEXT, `date_end` TEXT, `id_student` INTEGER NOT NULL, `price` REAL NOT NULL, FOREIGN KEY(`id_student`) REFERENCES `id_student`(`id`) );';
      let sqlDelClass = 'DELETE FROM class;';

      let sqlTablePayment = 'CREATE TABLE IF NOT EXISTS "payment" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `id_class` INTEGER NOT NULL, `paid` REAL DEFAULT 0, FOREIGN KEY(`id_class`) REFERENCES `class`(`id`) );';
      let sqlDelPayment = 'DELETE FROM payment;';

      return Promise.all(
        [
          this.db.executeSql(sqlTableAlumnos, []),
          this.db.executeSql(sqlDelAlumnos, []),
          this.db.executeSql(sqlAli1, []),
          this.db.executeSql(sqlAli2, []),
          this.db.executeSql(sqlAli3, []),
          this.db.executeSql(sqlTableClass, []),
          this.db.executeSql(sqlDelClass, []),
          this.db.executeSql(sqlTablePayment, []),
          this.db.executeSql(sqlDelPayment, [])
        ]
      ).then( () =>{
          return true;
      });
    });
  }

  //Students
  createStudents(student: Student){ 
    const sql = 'INSERT INTO students(name, surname, email, phone) VALUES(?,?,?,? )';
    return this.db.executeSql(sql, [
      student.name,
      student.surname,
      student.email,
      student.phone
    ]);
  }

  getStudents(){
    let sql = 'SELECT * FROM students';

    return this.db.executeSql( sql, []).then( respnse =>{
      let students = [];
      for (let index = 0; index < respnse.rows.length; index++) {
        const row = respnse.rows.item(index);
        let student: Student = row as Student;
        students.push(student);
      }
      return Promise.resolve(students);
    }).catch(error => Promise.reject(error));
  }

  updateStudent(student: Student){
    let sql = 'UPDATE students SET name=?, surname=?, email=?, phone=? WHERE id=?';
    return this.db.executeSql(sql, [
      student.name,
      student.surname,
      student.email,
      student.phone,
      student.id
    ])
  }
}
