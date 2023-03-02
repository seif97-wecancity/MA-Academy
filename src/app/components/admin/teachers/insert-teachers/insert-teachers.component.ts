import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-teachers',
  templateUrl: './insert-teachers.component.html',
  styleUrls: ['./insert-teachers.component.css']
})
export class InsertTeachersComponent implements OnInit {
update:boolean = false;
button:boolean = false;
dropdownSettings = {
  singleSelection: false,
  idField: 'id',
  textField: 'title',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
 
};
selectedItems:any [];
data:any [];
  TeacherForm:FormGroup;
  imageLogo:string;
  Image:File;
  constructor(private _FormBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.initiate();
  }

  initiate(){
    this.TeacherForm = this._FormBuilder.group({
      Name: ['', Validators.required],
      Course: ['', Validators.required],
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
  get fc() {
    return this.TeacherForm.controls;
  }


  onSubmit(){
    this.button = true;
    if(this.TeacherForm.status == "Valid"){
      Swal.fire({
        icon: "success",
        title: "تم تسجيل المدرس بنجاح",
        showConfirmButton: false,
        timer: 1500,
      }); 
    }else{
      this.button = false;
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'تأكد من ملئ جميع الخانات',
      });  
    }
  }
}
