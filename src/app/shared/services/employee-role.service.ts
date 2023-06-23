import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { EmployeeRoleModel } from '../models/employee-role.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeRoleService {

  Url = environment.root;
  empRoleId:number | any;
  employeeRole: EmployeeRoleModel[] | any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
 
  constructor(private httpClient: HttpClient) { }
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
  addEmployeeRole(employeeRole: any) {
    console.log(employeeRole);
    return this.httpClient.post(`${this.Url}/role`, employeeRole);
  }
  getEmployeeRoleById(id: number) {
    return this.httpClient.get(`${this.Url}/role/${id}`);
  }
  getEmployeeRole() {
    return this.httpClient.get(`${this.Url}/role`);
  }
  updateEmployeeRole(id: number, employeeRole: any) {
    return this.httpClient.patch(`${this.Url}/role/${id}`, employeeRole);
  }
  deleteEmployeeRole(id: number) {
    return this.httpClient.delete(`${this.Url}/role/${id}`, { headers: this.headers });
  }

  setter(empRoleId: any) {
    this.empRoleId = empRoleId;
  }
  getter() {
    return this.empRoleId;
  }
}
