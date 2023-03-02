import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import Swal from 'sweetalert2';
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
button:boolean = false;
title:string = 'app';
elementType:string = NgxQrcodeElementTypes.URL;
correctionLevel  = NgxQrcodeErrorCorrectionLevels.HIGH;
QrCode:string = null;
  constructor(private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initiate();
  }

  initiate(){
    this.CourseForm = this._FormBuilder.group({
      Name: ['', Validators.required],
      Educationlevel: ['', Validators.required],
      QrCode: ['', Validators.required],
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
    if(this.CourseForm.status == "Valid"){
      Swal.fire({
        icon: "success",
        title: "تم تسجيل الكورس بنجاح",
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
