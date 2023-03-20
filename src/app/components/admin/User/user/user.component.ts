import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from './../../../../shared/API-Service/services/register.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userForm:FormGroup;
update:boolean = false;
button:boolean = false;
gender:String []= [ 'ذكر', 'انثى'];
  constructor(private _FormBuilder:FormBuilder
             ,private _RegisterService:RegisterService
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.initiate();
  }


  initiate(){
    this.userForm = this._FormBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(`^01[0125]{1}[0-9]{8}`)]],
      email: ['', [Validators.required,Validators.pattern(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$`)]],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      role: ['admin', Validators.required]
    });
  }
  get fc(){
    return this.userForm.controls;
  }

  onSubmit(){
    this.button = true;
    if( this.userForm.status == "VALID" && this.update == false){
      this._RegisterService.CreateAdmin(this.userForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل شخص جديد بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.userForm.reset();
       this._Router.navigate(['content/admin/ViewUser']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else 
    {
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
    }
   
  }
}
