import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentsService } from './../../../../shared/API-Service/services/students.service';

@Component({
  selector: 'app-insert-students',
  templateUrl: './insert-students.component.html',
  styleUrls: ['./insert-students.component.css']
})
export class InsertStudentsComponent implements OnInit {
StudentForm:FormGroup;
Image:File;
imageLogo:string;
recordtoupdate:any;
update:boolean = false;
button:boolean = false
  constructor(private _FormBuilder:FormBuilder, private _StudentsService:StudentsService, private _Router:Router) { }

  ngOnInit(): void {
    this._StudentsService.Student.subscribe((res) => {
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
    this.StudentForm = this._FormBuilder.group({
      name: ['', Validators.required],
      education_level: ['', Validators.required]
      // Photo: ['', Validators.required]
    });
  }
  checkupdate(data?:any){
    this.StudentForm = this._FormBuilder.group({
      name: [data.name, Validators.required],
      grade: [data.grade, Validators.required]
      // Photo: ['', Validators.required]
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
        // this.logoForm?.append("image", this.Image);
      };
    }
  }
  get fc(){
    return this.StudentForm.controls;
  }
  
  onSubmit(){
    this.button = true;
    if( this.StudentForm.status == "VALID" && this.update == false){
      this._StudentsService.CreateStudent(this.StudentForm.value).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تسجيل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.StudentForm.reset();
       this._Router.navigate(['content/admin/ViewStudents']);
       },(err) => {
        this.button = false;
             Swal.fire({
               icon: 'error',
               title: 'خطأ',
               text: 'تأكد من ملئ جميع الخانات',
             });
             this.button = false;
       })
    }else if(this.StudentForm.status == "VALID" && this.update == true){
      this._StudentsService.UpdateStudent(this.StudentForm.value , this.recordtoupdate.id).subscribe((res) => {
        Swal.fire({
         icon: "success",
         title: "تم تعديل الكورس بنجاح",
         showConfirmButton: false,
         timer: 1500,
       }); 
       this.StudentForm.reset();
       this._Router.navigate(['content/admin/ViewStudents']);
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
    this._StudentsService.Student.next(null);
     }
}
