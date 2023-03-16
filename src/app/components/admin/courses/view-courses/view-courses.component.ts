import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
courses:any [];
  constructor(private _CoursesService:CoursesService, private _Router:Router) { }

  ngOnInit(): void {
    this.getcourses();
  }

  getcourses(){
    this._CoursesService.GetCourse().subscribe((res) => {
      this.courses = res.data;
    })
  }
  update(record:object){
    this._CoursesService.Subject.next(record);
    this._Router.navigate(['content/admin/InsertCourses']);
  }

  delete(id:number){
    Swal.fire({
      title: 'هل تريد مسح الكورس ؟',
      text: "لن يكون لك صلاحية إعادته مره اخرى",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'امسح العنصر !'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CoursesService.DeleteCourse(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getcourses();
        },(err) => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text:err.error.message    
          })
          this.getcourses();
      //     Swal.fire({
      //       icon: "success",
      //       title: "تم المسح بنجاح",
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //  this.getcourses();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
}
