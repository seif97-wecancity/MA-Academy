import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
courses:any [];
  constructor() { }

  ngOnInit(): void {
  }

  
  update(record:object){

  }
  delete(id:number){

  }
}
