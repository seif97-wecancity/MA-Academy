import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InsertCourseContentComponent } from "./course-content/insert-course-content/insert-course-content.component";
import { ViewCourseContentComponent } from "./course-content/view-course-content/view-course-content.component";
import { InsertCoursesComponent } from "./courses/insert-courses/insert-courses.component";
import { ViewCoursesComponent } from "./courses/view-courses/view-courses.component";
// ChangePassword Component



import { ViewProductComponent } from './product/view-product/view-product.component';
import { InsertStudentsComponent } from "./students/insert-students/insert-students.component";
import { ViewStudentsComponent } from "./students/view-students/view-students.component";
import { InsertTeachersComponent } from "./teachers/insert-teachers/insert-teachers.component";
import { ViewTeachersComponent } from "./teachers/view-teachers/view-teachers.component";
import { ChangePasswordComponent } from "./User/change-password/change-password.component";
import { UserComponent } from "./User/user/user.component";





const routes: Routes = [
    {
        path: "",
        children: [
            

            {
                path: "ViewProduct",
                component: ViewProductComponent,
            },
            {
                path: "ViewTeachers",
                component: ViewTeachersComponent,
            },
            {
                path: "InsertTeachers",
                component: InsertTeachersComponent,
            },
            {
                path: "ViewStudents",
                component: ViewStudentsComponent,
            },
            {
                path: "InsertStudents",
                component: InsertStudentsComponent,
            },
            {
                path: "ViewCourses",
                component: ViewCoursesComponent,
            },
            {
                path: "InsertCourses",
                component: InsertCoursesComponent,
            },
            {
                path: "InsertUser",
                component: UserComponent,
            },
            {
                path: "ViewCourseLecture",
                component: ViewCourseContentComponent,
            },
            {
                path: "InsertCourseLecture",
                component: InsertCourseContentComponent,
            },
            {
                path: "ChangePassword",
                component: ChangePasswordComponent,
            },
           
            
           
            
           
],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
