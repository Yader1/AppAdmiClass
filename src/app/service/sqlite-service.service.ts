import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Class } from '../models/class';
import { Filter } from '../models/Filter';
import { Payment } from '../models/payment';
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

      let sqlCl1 = "INSERT INTO class VALUES (1, '2020-10-03T15:00', '2020-10-03T16:00', 1, 10);";
      let sqlCl2 = "INSERT INTO class VALUES (2, '2020-10-04T16:00', '2020-10-04T17:00', 2, 5);";
      let sqlCl3 = "INSERT INTO class VALUES (3, '2020-10-05T17:00', '2020-10-05T18:00', 2, 15);";

      let sqlTablePayment = 'CREATE TABLE IF NOT EXISTS "payment" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `date` TEXT, `id_class` INTEGER NOT NULL, `paid` REAL DEFAULT 0, FOREIGN KEY(`id_class`) REFERENCES `class`(`id`) );';
      let sqlDelPayment = 'DELETE FROM payment;';

      let sqlP1 = "INSERT INTO payment VALUES (1, '2020-10-03T15:00', 1, 1);";
      let sqlP2 = "INSERT INTO payment VALUES (2, null, 2, 0);";
      let sqlP3 = "INSERT INTO payment VALUES (3, '2020-10-07T17:00', 3, 1);";

      return Promise.all(
        [
          this.db.executeSql(sqlTableAlumnos, []),
          this.db.executeSql(sqlDelAlumnos, []),
          this.db.executeSql(sqlAli1, []),
          this.db.executeSql(sqlAli2, []),
          this.db.executeSql(sqlAli3, []),
          this.db.executeSql(sqlTableClass, []),
          this.db.executeSql(sqlDelClass, []),
          this.db.executeSql(sqlCl1, []),
          this.db.executeSql(sqlCl2, []),
          this.db.executeSql(sqlCl3, []),
          this.db.executeSql(sqlTablePayment, []),
          this.db.executeSql(sqlDelPayment, []),
          this.db.executeSql(sqlP1, []),
          this.db.executeSql(sqlP2, []),
          this.db.executeSql(sqlP3, [])
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

  getStudents(search?: string){
    let sql = 'SELECT * FROM students';

    if(search){
      sql += " WHERE lower(name) LIKE '%" + search.toLowerCase() + "%' or lower(surname) LIKE '%" + search.toLowerCase() + "%'";
    }

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

  //Clases
  createClass(c: Class){
    const sql = 'INSERT INTO class(date_start, date_end, id_student, price) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [
      c.date_start,
      c.date_end,
      c.id_student,
      c.price
    ]);
  }

  getClasses(filter: Filter = null){
    let sql = 'SELECT * from class WHERE 1 ';

    if(filter){
      if(filter.date_start){
        sql += " and date_start >= '" + filter.date_start + "' ";
      }
      if(filter.date_end){
        sql += " and date_end <= '" + filter.date_end + "' ";
      }
      if(filter.id_student){
        sql += " and id_student = " + filter.id_student + " ";
      }
    }

    sql += 'ORDER BY  date_start, date_end';

    return this.db.executeSql(sql, []).then( response=>{
      let classes = [];

      for (let index = 0; index < response.rows.length; index++) {
        const row = response.rows.item(index);

        let c: Class = row as Class;
        classes.push(c);
      }
      return Promise.resolve(classes);
    }).catch(error => Promise.reject(error))
  }

  updateClass(c: Class){
    const sql = 'UPDATE class SET date_start=?, date_end=?, id_student=?, price=? WHERE id=?';
    return this.db.executeSql(sql, [
      c.date_start,
      c.date_end,
      c.id_student,
      c.price,
      c.id
    ]);
  }

  deleteClass(c: Class){
    const sql = 'DELETE FROM class WHERE id=?';

    return this.db.executeSql(sql,[
      c.id
    ]);
  }

  //Payments
  getPayments(filter: Filter = null){
    let sql = 'SELECT p.id, p.date, p.id_class, p.paid FROM payment p, class c WHERE p.id_class = c.id ';

    if(filter){
      if(filter.paid != null){
        if(filter.paid){
          sql += " and p.paid = 1 ";
        }else{
          sql += " and p.paid = 0 ";
        }
      }
      if(filter.date_start){
        if(filter.paid){
          sql += " and p.date >= '" + filter.date_start + "'";
        }else{
        sql += " and c.date_start >= '" + filter.date_start + "'";
        }
      }

      if(filter.date_end){
        if(filter.paid){
          sql += " and p.date <= '" + filter.date_end + "'";
        }else{
        sql += " and c.date_end <= '" + filter.date_end + "'";
        }
      }

      if(filter.id_student){
        sql += " and c.id_student = " + filter.id_student;
      }
    }

    sql += ' ORDER BY p.date';

    return this.db.executeSql(sql, []).then( response => {
      let payment = [];
      for (let i = 0; i < response.rows.length; i++){
        const row = response.rows.item(i);

        let p: Payment = row as Payment;
        payment.push(p);
      }

      return Promise.resolve(payment);
    }).catch(error => Promise.reject(error));
  }

  createPayment(p: Payment){
    const sql = 'INSERT INTO payment(date, id_class, paid) VALUES(?,?,?)';
    return this.db.executeSql(sql, [
      p.date,
      p.id_class,
      p.paid
    ]);
  }

  getPaymentByClass(idClass: number){
    const sql = 'SELECT * FROM payment WHERE id_class = ?';
    return this.db.executeSql(sql, [
      idClass
    ]).then( response => {
      let payment: Payment = null;
      if (response.rows.length > 0){
        const row = response.rows.item(0);

        payment = row as Payment;
      }

      return Promise.resolve(payment);
    }).catch(error => Promise.reject(error));
  }

  updatePayment(p: Payment){
    const sql = 'UPDATE payment SET date=?, id_class=?, paid=? WHERE id = ?';
    return this.db.executeSql(sql, [
      p.date, 
      p.id_class, 
      p.paid, 
      p.id
    ])
  }
}
