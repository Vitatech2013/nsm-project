import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {
  Url = environment.root;
  exType:number | any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient) { }

  addExpenseType(expense: any) {
    return this.httpClient.post(`${this.Url}/expense-type`, expense);
  }
  getExpenseTypeById(id: number) {
    return this.httpClient.get(`${this.Url}/expense-type/${id}`);
  }
  getExpenseType() {
    return this.httpClient.get(`${this.Url}/expense-type`);
  }
  updateExpenseType(id: number, expense: any) {
    return this.httpClient.patch(`${this.Url}/expense-type/${id}`, expense);
  }
  deleteExpenseType(id: number) {
    return this.httpClient.delete(`${this.Url}/expense-type/${id}`, { headers: this.headers });
  }
  setter(exType: any) {
    this.exType = exType;
  }
  getter() {
    return this.exType;
  }
}
