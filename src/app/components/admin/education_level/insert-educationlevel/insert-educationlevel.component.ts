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
  constructor(private _EducationLevelService:EducationLevelService
             ,private _FormBuilder:FormBuilder
             ,private _Router:Router) { }

  ngOnInit(): void {
    this.initiate();
  }

  initiate(){
    this.educationlevelForm = this._FormBuilder.group({
      name: ['', Validators.required],
      nameEn: ['', Validators.required]
    });
  }

get fc(){
  return this.educationlevelForm.controls;
}

  onSubmit(){

  }

}
