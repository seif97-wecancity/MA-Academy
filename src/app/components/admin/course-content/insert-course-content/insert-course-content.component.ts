import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../../../shared/API-Service/services/teachers.service';
import { CoursesService } from '../../../../shared/API-Service/services/courses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CourseContentService } from './../../../../shared/API-Service/services/course-content.service';
import { SubcourseService } from './../../../../shared/API-Service/services/subcourse.service';
@Component({
  selector: 'app-insert-course-content',
  templateUrl: './insert-course-content.component.html',
  styleUrls: ['./insert-course-content.component.css']
})
export class InsertCourseContentComponent implements OnInit {
courses:any [];
teachers:any [];
subSubjects:any [];
CourseLectureForm:FormGroup;
CourseLectureFormData:FormData;
Image : File;
File : File;
imageLogo:string;
fileLogo:string;
update:boolean = false;
button:boolean = false;
recordtoupdate:any;
subSubjectid:number;
  constructor(private _CoursesService:CoursesService
             ,private _CourseContentService :CourseContentService 
             ,private _TeachersService:TeachersService
             ,private _FormBuilder:FormBuilder
             ,private _Router:Router
             ,private _SubcourseService:SubcourseService) { }

  ngOnInit(): void {
    this.getdropdowns();
    this._CourseContentService.coursecontent.subscribe((res) => {
      if( res == null){
        this._CourseContentService.insertnewcoursecontent.subscribe((data) => {
          if( data == null){
            this.initiate();
          }else{
            this.initiate(data);
          }
        })
      }else{
        this.recordtoupdate = res;
         this.checkedit(this.recordtoupdate);
         this.update = true;
      }
    })

  }


  getdropdowns(){
    this._CoursesService.GetCourse().subscribe((res) => {
      this.courses = res.data;
    });
    this._TeachersService.GetTeacher().subscribe((res) => {
      this.teachers = res.data;
    });
    this._SubcourseService.GetSubCourse().subscribe((res) =>{
      this.subSubjects = res.data;
    });
    
  }

  initiate(data?:any){
    this.CourseLectureForm = this._FormBuilder.group({
      subjectContentName: [data.beforeSubjectContentId || '', Validators.required],
      price: ['', Validators.required],
      subSubjectId: [data.subSubjectId || '', Validators.required],
      beforSubjectContentId: [data.beforSubjectContentId || '', Validators.required],
      videoURL: ['', Validators.required],
      teacherId: ['', Validators.required],
      description: ['', Validators.required],
      subjectId: ['', Validators.required]
    });
  }
  checkedit(data:any){
    this.CourseLectureForm = this._FormBuilder.group({
      subjectContentName: [data.subjectContentName, Validators.required],
      price: [data.price, Validators.required],
      subjectContentImage: [data.subjectContentImage, Validators.required],
      subSubjectId: [data.subSubjectId, Validators.required],
      videoURL: [data.video_url, Validators.required],
      teacherId: [data.teacherId, Validators.required],
      description: [data.description, Validators.required],
      subjectId: [data.subjectId, Validators.required]
    });
  }
  get fc(){
    return this.CourseLectureForm.controls;
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
      this._CourseContentService.CreateCourseContent(this.CourseLectureForm.value).subscribe((res) => {
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
      // this.appendform();
      this._CourseContentService.UpdateCourseContent(this.CourseLectureForm.value, this.recordtoupdate.subSubjectId).subscribe((res) => {
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

  ngOnDestroy(){
    this._CourseContentService.coursecontent.next(null);
    this._CourseContentService.insertnewcoursecontent.next(null);
     }

  
}
