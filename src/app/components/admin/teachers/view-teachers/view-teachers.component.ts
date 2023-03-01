import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit {
teachers:any = [];


  constructor() { }

  ngOnInit(): void {
  }



  delete(id : number){

  }
  update(record:object){

  }
}
