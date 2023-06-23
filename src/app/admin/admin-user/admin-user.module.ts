import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeRoleComponent } from './employee-role/add-employee-role/add-employee-role.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';

@NgModule({
  declarations: [
    EmployeesComponent,
       AddEmployeeComponent,
       EmployeeRoleComponent,
       AddEmployeeRoleComponent
  ],
  imports: [
    CommonModule,
    AdminUserRoutingModule,
    MaterialModule,
    HttpClientModule,
    PDFExportModule,AgGridModule.withComponents([ButtonRendererComponent])
   ]
})
export class AdminUserModule { }
