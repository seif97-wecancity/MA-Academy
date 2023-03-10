import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  constructor(private _HttpClient:HttpClient) { }


  GetCourseContent():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listSubjectContent`);
  }

  CreateCourseContent(data : object):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addSubjectContent`, data);
  }

  UpdateCourseContent(data : object):Observable<any>{
   return this._HttpClient.put(`${environment.Server_URL}/listSubject`, data);
  }

  DeleteCourseContent(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteSubjectContent/${id}`);
  }
}

