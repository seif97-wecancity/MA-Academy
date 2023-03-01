import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userForm:FormGroup;
update:boolean = false;
button:boolean = false;
  constructor(private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initiate();
  }

  
  initiate(){
    this.userForm = this._FormBuilder.group({
      Name: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  get fc(){
    return this.userForm.controls;
  }

  onSubmit(){

  }
}
