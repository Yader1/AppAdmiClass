import { Student } from "./student";

export class Class {
    id: number;
    date_start: string;
    date_end: string;
    id_student: number;
    price: number;
    student?: Student;

    needPay?: boolean;
}
