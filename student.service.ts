import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
 import {Student} from './student'
import { Injectable } from '@angular/core';
import {map} from 'rxjs-compat/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



 @Injectable()
export class StudentService{    
    constructor(private _httpService:Http){ }

    getAllStudents(): Observable<Student[]>{
       return this._httpService.get('http://localhost:8080/students/')
        .map((response:Response)=>response.json())
        .catch(this.handleError);

        
    }
    private handleError(error:Response){
        return Observable.throw(error);
        
    }
    addStudent(student: Student){
        let body=JSON.stringify(student);
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        return this._httpService.post('http://localhost:8080/students/',body,options);
    }

    deleteStudent(studentId:string){
        return this._httpService.delete('http://localhost:8080/students/' + studentId);
    }

    getStudentById(studentId:string): Observable<Student>{
        return this._httpService.get('http://localhost:8080/students/' + studentId)
         .map((response:Response)=>response.json())
         .catch(this.handleError);

    }
}