import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../../shared/API-Service/services/teachers.service';
import { CoursesService } from '../../../../shared/API-Service/services/courses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
@Component({
  selector: 'app-insert-course-content',
  templateUrl: './insert-course-content.component.html',
  styleUrls: ['./insert-course-content.component.css']
})
export class InsertCourseContentComponent implements OnInit {
courses:any [];
teachers:any [];
CourseLectureForm:FormGroup;
CourseLectureFormData:FormData;
Image : File;
File : File;
imageLogo:string;
fileLogo:string;
update:boolean = false;
button:boolean = false;
recordtoupdate:any;
  constructor(private _CoursesService:CoursesService
             ,private _CourseContentService :CourseContentService 
             ,private _TeachersService:TeachersService
             ,private _FormBuilder:FormBuilder
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.getdropdowns();
    this.initiate();
  }


  getdropdowns(){
    this._CoursesService.GetCourse().subscribe((res) => {
      this.courses = res;
    });
    this._TeachersService.GetTeacher().subscribe((res) => {
      this.teachers = res;
    });
  }

  initiate(){
    this.CourseLectureForm = this._FormBuilder.group({
      name: ['', Validators.required],
      // lessonnumber: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      videoURL: ['', Validators.required],
      teacherId: ['', Validators.required],
      description: ['', Validators.required],
      courseId: ['', Validators.required]
    });
  }
  get fc(){
    return this.CourseLectureForm.controls;
  }

  appendform(){
    this.CourseLectureFormData = new FormData();
    this.CourseLectureFormData.append("name", this.CourseLectureForm.value.name);
    this.CourseLectureFormData.append("description", this.CourseLectureForm.value.description);
    this.CourseLectureFormData.append("subject_id", this.CourseLectureForm.value.courseId);
    this.CourseLectureFormData.append("teacher_id", this.CourseLectureForm.value.teacherId);
    this.CourseLectureFormData.append("video_url", this.CourseLectureForm.value.videoURL);
    this.CourseLectureFormData.append("price", this.CourseLectureForm.value.price);
    this.CourseLectureFormData.append("image", this.Image);
    this.CourseLectureFormData.append("file", this.File);
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
  // File
  getFileUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.File = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileLogo = 'assets/images/file.png';
      };
    }
  }
  
  onSubmit(){
    this.button = true;
    if( this.CourseLectureForm.status == "VALID" && this.update == false){
      this.appendform();
      this._CourseContentService.CreateCourseContent(this.CourseLectureFormData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل محتوى المادة بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CourseLectureForm.reset();
       this._Router.navigate(['content/admin/ViewCourseLecture']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.CourseLectureForm.status == "VALID" && this.update == true){
      this.appendform();
      this.CourseLectureFormData.append('Id', this.recordtoupdate.id);
      this._CourseContentService.UpdateCourseContent(this.CourseLectureFormData).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.CourseLectureForm.reset();
       this._Router.navigate(['content/admin/ViewCourseLecture']);
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
}
