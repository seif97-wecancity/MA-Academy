import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
ChangepasswordForm:FormGroup;
button:boolean = false;
  constructor(private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initiate();
  }

  initiate(){
    this.ChangepasswordForm = this._FormBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
    });
  }
  get fc(){
    return this.ChangepasswordForm.controls;
  }

  onSubmit(){

  }
}
