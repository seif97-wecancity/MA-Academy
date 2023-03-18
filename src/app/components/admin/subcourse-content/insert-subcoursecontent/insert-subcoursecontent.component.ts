import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EducationLevelService } from './../../../../shared/API-Service/services/education-level.service';
import { CoursesService } from './../../../../shared/API-Service/services/courses.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-insert-subcoursecontent',
  templateUrl: './insert-subcoursecontent.component.html',
  styleUrls: ['./insert-subcoursecontent.component.css']
})
export class InsertSubcoursecontentComponent implements OnInit {
  subcoursecontentForm:FormGroup;
  button:boolean = false;
  update:boolean = false;
  recordtoupdate:any;
  subjects:any;
  dropdownSettings:any = {};
  
  constructor(private _Router:Router
             ,private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initiate();
  }

  initiate(){
    this.subcoursecontentForm = this._FormBuilder.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required]
    });
  }
  get fc(){
    return this.subcoursecontentForm.controls;
  }



  onSubmit(){

  }
}
