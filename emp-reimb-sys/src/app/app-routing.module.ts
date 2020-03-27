import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from "./login/login.component";
import { EmployeeComponent } from "./employee/employee.component";
import { ReimbursementDetailComponent } from "./reimbursement-detail/reimbursement-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'reimbursement/detail/:id', component: ReimbursementDetailComponent },
  { path:'employee', component: EmployeeComponent },
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }