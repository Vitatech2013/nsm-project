import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', component: EmployeesComponent},
      {path: 'add', component: AddEmployeeComponent},
      {path: ':id/edit', component: AddEmployeeComponent},
      {path: 'employee-role', component: EmployeeRoleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserRoutingModule { }
