import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-students',
  templateUrl: './insert-students.component.html',
  styleUrls: ['./insert-students.component.css']
})
export class InsertStudentsComponent implements OnInit {
StudentForm:FormGroup;
Image:File;
imageLogo:string;
update:boolean = false;
button:boolean = false
  constructor(private _FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initiate();
  }


  initiate(){
    this.StudentForm = this._FormBuilder.group({
      Name: ['', Validators.required],
      Age: ['', Validators.required],
      Photo: ['', Validators.required]
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
  
 }
}
