import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EducationLevelService } from './../../../../shared/API-Service/services/education-level.service';

@Component({
  selector: 'app-insert-educationlevel',
  templateUrl: './insert-educationlevel.component.html',
  styleUrls: ['./insert-educationlevel.component.css']
})
export class InsertEducationlevelComponent implements OnInit {
educationlevelForm:FormGroup;
button:boolean = false;
update:boolean = false;
recordtoupdate:any;
  constructor(private _EducationLevelService:EducationLevelService
             ,private _FormBuilder:FormBuilder
             ,private _Router:Router) { }

  ngOnInit(): void {
    this._EducationLevelService.EducationLevel.subscribe((res) => {
      if( res == null){
        this.initiate();
      }else{
        this.update = true;
        this.recordtoupdate = res;
        this.checkupdate(res);
      }
    })
    
  }

  initiate(){
    this.educationlevelForm = this._FormBuilder.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required]
    });
  }
  checkupdate(data:any){
    this.educationlevelForm = this._FormBuilder.group({
      nameEn: [data.nameEn, Validators.required],
      nameAr: [data.nameAr, Validators.required]
    });
  }

get fc(){
  return this.educationlevelForm.controls;
}

onSubmit(){
  this.button = true;
  if( this.educationlevelForm.status == "VALID" && this.update == false){
    this._EducationLevelService.CreateEducationLevel(this.educationlevelForm.value).subscribe((res) => {
      Swal.fire({
       icon: "success",
       title: "تم تسجيل المرحلة الدراسية بنجاح",
       showConfirmButton: false,
       timer: 1500,
     }); 
     this.educationlevelForm.reset();
     this._Router.navigate(['content/admin/ViewEducationLevel']);
     },(err) => {
      this.button = false;
           Swal.fire({
             icon: 'error',
             title: 'خطأ',
             text: 'تأكد من ملئ جميع الخانات',
           });
           this.button = false;
     })
  }else if(this.educationlevelForm.status == "VALID" && this.update == true){
    this._EducationLevelService.UpdateEducationLevel(this.educationlevelForm.value, this.recordtoupdate.id).subscribe((res) => {
      Swal.fire({
       icon: "success",
       title: "تم تعديل المرحلة الدراسية بنجاح",
       showConfirmButton: false,
       timer: 1500,
     }); 
     this.educationlevelForm.reset();
     this._Router.navigate(['content/admin/ViewEducationLevel']);
     },(err) => {
      this.button = false;
           Swal.fire({
             icon: 'error',
             title: 'خطأ',
             text: 'تأكد من ملئ جميع الخانات',
           });
           this.button = false;
     })
  }
  else{
    this.button = false;
           Swal.fire({
             icon: 'error',
             title: 'خطأ',
             text: 'تأكد من ملئ جميع الخانات',
           });
           this.button = false;
  }
 
}


  ngOnDestroy(){
    this._EducationLevelService.EducationLevel.next(null);
     }
}
