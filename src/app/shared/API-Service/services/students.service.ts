import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private _HttpClient:HttpClient) { }

  // This to get the products 
  Get():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/company-profile`);
   }
}
