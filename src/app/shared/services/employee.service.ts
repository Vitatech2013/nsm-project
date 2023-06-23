import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from '../models/employee.model';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  Url = environment.root;
  empId:number | any;
  employees: EmployeeModel[] | any
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addEmployees(employee: any) {
    return this.httpClient.post(`${this.Url}/employee`, employee);
  }
  getEmployeesById(id: number) {
    return this.httpClient.get(`${this.Url}/employee/${id}`);
  }
  getEmployees() {
    return this.httpClient.get(`${this.Url}/employee`);
  }
  updateEmployee(id: number, employee: any) {
    return this.httpClient.patch(`${this.Url}/employee/${id}`, employee);
  }
  deleteEmployee(id: number) {
    return this.httpClient.delete(`${this.Url}/employee/${id}`, { headers: this.headers });
  }
  changePassword(id: number, employee: any) {
    return this.httpClient.put(`${this.Url}/employee/changePassword/${id}`, employee);
  }

  

  setter(empId: any) {
    this.empId = empId;
  }
  getter() {
    return this.empId;
  }
  exportToExcel(json: any[], excelFileName: string, headerInfo: string[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, { header: headerInfo});
    const workbook: XLSX.WorkBook = {
     Sheets: { 'data': worksheet },
     SheetNames: ['data'],
    };
}

}
