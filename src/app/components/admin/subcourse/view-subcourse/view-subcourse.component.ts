import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubcourseService } from '../../../../shared/API-Service/services/subcourse.service';

@Component({
  selector: 'app-view-subcourse',
  templateUrl: './view-subcourse.component.html',
  styleUrls: ['./view-subcourse.component.css']
})
export class ViewSubcourseComponent implements OnInit {
subsubjects:any [];
  constructor(private _SubcourseService:SubcourseService
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.getsubsubjects();
  }


  getsubsubjects(){
    this._SubcourseService.GetSubCourse().subscribe((res) => {
      this.subsubjects = res;
    })
  }
  delete(id : number){
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
        this._SubcourseService.DeleteSubCourse(id).subscribe((res) => {
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getsubsubjects();
        },(err) => {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'خطأ',
          //   text:err.error.message    
          // })
          // this.getsubsubjects();
          Swal.fire({
            icon: "success",
            title: "تم المسح بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
       this.getsubsubjects();
        },() => {
          console.log("completed");
        })
      }
    }) 
  }
  update(record:object){
    this._SubcourseService.SubSubject.next(record);
    this._Router.navigate(['content/admin/InsertSubSubject']);
  }
}
