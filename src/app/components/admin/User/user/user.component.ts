import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userForm:FormGroup;
update:boolean = false;
button:boolean = false;
courses:any [];
  constructor(private _FormBuilder:FormBuilder
             ,private _CoursesService:CoursesService) { }

  ngOnInit(): void {
    this.initiate();
    this.getdropdowns();
  }

  getdropdowns(){
  this._CoursesService.GetCourse().subscribe((res) => {
    this.courses = res;
  })
  }
  initiate(){
    this.userForm = this._FormBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      education_level: ['', Validators.required],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }
  get fc(){
    return this.userForm.controls;
  }

  onSubmit(){
    this.button = true;
    if(this.userForm.status == "Valid"){
      Swal.fire({
        icon: "success",
        title: "تم تسجيل الطالب بنجاح",
        showConfirmButton: false,
        timer: 1500,
      }); 
    }else{
      this.button = false;
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });  
    }
  }
}
