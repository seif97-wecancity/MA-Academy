
 
 

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
 
import { RouterModule } from '@angular/router';
 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPrintElementModule } from 'ngx-print-element';
 
import { NgApexchartsModule } from 'ng-apexcharts';
 

 

// **  
import {NgxPaginationModule} from 'ngx-pagination';

// cookie 
import { CookieService } from 'ngx-cookie-service'


import { DxReportViewerModule } from 'devexpress-reporting-angular';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ViewTeachersComponent } from './teachers/view-teachers/view-teachers.component';
import { InsertTeachersComponent } from './teachers/insert-teachers/insert-teachers.component';
import { ViewStudentsComponent } from './students/view-students/view-students.component';
import { InsertStudentsComponent } from './students/insert-students/insert-students.component';
import { ViewCoursesComponent } from './courses/view-courses/view-courses.component';
import { InsertCoursesComponent } from './courses/insert-courses/insert-courses.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { UserComponent } from './User/user/user.component';
import { ChangePasswordComponent } from './User/change-password/change-password.component';
import { CourseContentComponent } from './course-content/course-content.component';

 @NgModule({
  declarations: [
    ViewProductComponent,
    ViewTeachersComponent,
    InsertTeachersComponent,
    ViewStudentsComponent,
    InsertStudentsComponent,
    ViewCoursesComponent,
    InsertCoursesComponent,
    UserComponent,
    ChangePasswordComponent,
    CourseContentComponent,
   
    
  ],
  imports: [
    DxReportViewerModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    NgxPaginationModule,
    RouterModule,
    NgApexchartsModule,
    NgxPrintElementModule,
    NgxQRCodeModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
   CookieService
  ],
  
  exports:[ ]
})
export class AdminModule { }
