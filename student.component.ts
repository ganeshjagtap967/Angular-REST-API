import {Component, OnInit} from '@angular/core';
import {Student} from './student';
import { StudentService } from './student.service';
import { error } from 'util';

@Component({
    selector:'app-student',
    templateUrl:'./student.component.html',
    styleUrls:['./student.component.css']
})
export class StudentComponent implements OnInit{
    students:Student[];
    student=new Student();
 constructor(private _studentservice:StudentService){}

 ngOnInit():void{
    this.getStudents();

 }

 getStudents(): void{
     this._studentservice.getAllStudents()
     .subscribe((studentData)=>{this.students=studentData,
    console.log(studentData);
    }, (error)=>{
        console.log(error);
    });
 }
addStudent(): void{
    this._studentservice.addStudent(this.student)
        .subscribe((response)=>{console.log(response);
        this.reset();
        this.getStudents();
    }, (error)=>{
        console.log(error);
    });
}

private reset(){
    this.student.id=null;
    this.student.name=null;

}
deleteStudent(studentId:string){
this._studentservice.deleteStudent(studentId)
.subscribe((response)=>{console.log(response);
     this.getStudents(); },
      (error)=>{
    console.log(error);
})
}
getStudentById(studentId:string){
    this._studentservice.getStudentById(studentId)
    .subscribe((studentData)=>this.student=studentData); this.getStudents();
     (error)=>{console.log(error);}

    }
}
