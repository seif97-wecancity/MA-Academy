import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../shared/API-Service/services/students.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
students:any [];
  constructor(private _StudentsService:StudentsService) { }

  ngOnInit(): void {
  }



  delete(id : number){

  }
  update(record:object){

  }
}


