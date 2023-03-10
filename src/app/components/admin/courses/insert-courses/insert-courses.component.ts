import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Swal from 'sweetalert2';
import { CoursesService} from '../../../../shared/API-Service/services/courses.service';

@Component({
  selector: 'app-insert-courses',
  templateUrl: './insert-courses.component.html',
  styleUrls: ['./insert-courses.component.css']
})
export class InsertCoursesComponent implements OnInit {
CourseForm:FormGroup;
Image:File;
imageLogo:string;
update:boolean = false;
recordtoupdate:any;
button:boolean = false;
title:string = 'app';
elementType:string = NgxQrcodeElementTypes.URL;
correctionLevel  = NgxQrcodeErrorCorrectionLevels.HIGH;
QrCode:string = null;
  constructor(private _FormBuilder:FormBuilder, private _CoursesService:CoursesService, private _Router:Router) { }

  ngOnInit(): void {
    this._CoursesService.Subject.subscribe((res) => {
      if(res == null){
        this.initiate();
      }else{
        this.update = true;
       this.recordtoupdate = res;
       this.checkupdate(this.recordtoupdate);
      }
    })
    
  }

  initiate(){
    this.CourseForm = this._FormBuilder.group({
      name: ['', Validators.required],
      // Educationlevel: ['', Validators.required],
      // QrCode: ['', Validators.required],
    });
  }
  checkupdate(data:any){
    this.CourseForm = this._FormBuilder.group({
      name: [data.name, Validators.required],
      // Educationlevel: ['', Validators.required],
      // QrCode: ['', Validators.required],
    });
  }

  // imgFile
  getLogoUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.Image = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageLogo = reader.result as string;
      };
    }
  }
  get fc(){
    return this.CourseForm.controls;
  }
  
  onSubmit(){
    this.button = true;
    if( this.CourseForm.status == "VALID" && this.update == false){
      this._CoursesService.CreateCourse(this.CourseForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "???? ?????????? ???????????? ??????????",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CourseForm.reset();
       this._Router.navigate(['content/admin/ViewCourses']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: '??????',
               text: '???????? ???? ?????? ???????? ??????????????',
             });
             this.button = false;
       })
    }else if(this.CourseForm.status == "VALID" && this.update == true){
      this._CoursesService.UpdateCourse(this.CourseForm.value , this.recordtoupdate.id).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "???? ?????????? ???????????? ??????????",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CourseForm.reset();
       this._Router.navigate(['content/admin/ViewCourses']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: '??????',
               text: '???????? ???? ?????? ???????? ??????????????',
             });
             this.button = false;
       })
    }
    else{
      this.button = false;
             Swal.fire({
               icon: 'error',
               title: '??????',
               text: '???????? ???? ?????? ???????? ??????????????',
             });
             this.button = false;
    }
   
  }
  

  ngOnDestroy(){
    this._CoursesService.Subject.next(null);
     }
}
