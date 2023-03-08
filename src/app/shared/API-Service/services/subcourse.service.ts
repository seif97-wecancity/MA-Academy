import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SubcourseService {
public SubSubject = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }

  GetSubCourse():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listSubSubject`);
  }

  CreateSubCourse(data : object):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addSubSubject`, data);
  }

  UpdateSubCourse(data : object, id:number):Observable<any>{
   return this._HttpClient.put(`${environment.Server_URL}/updateSubSubject/${id}?`, data);
  }

  DeleteSubCourse(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteSubSubject/${id}`);
  }
}
