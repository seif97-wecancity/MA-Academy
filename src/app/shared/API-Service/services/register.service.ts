import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private _HttpClient:HttpClient) { }

   

   CreateAdmin(data : object):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/register`, data);
  }

 
}
