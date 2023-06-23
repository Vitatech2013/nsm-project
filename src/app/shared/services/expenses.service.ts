import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  Url = environment.root;
  expensesID:number | any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient) { }

  addExpenses(expenses: any) {
    return this.httpClient.post(`${this.Url}/expenses`, expenses);
  }
  getExpensesById(id: number) {
    return this.httpClient.get(`${this.Url}/expenses/${id}`);
  }
  getExpenses() {
    return this.httpClient.get(`${this.Url}/expenses`);
  }
  getExpensesReports(fromDate: any, toDate: any) {
    return this.httpClient.post(`${this.Url}/expenses/reports`, {fromDate, toDate});
  }
  updateExpenses(id: number, expenses: any) {
    return this.httpClient.patch(`${this.Url}/expenses/${id}`, expenses);
  }
  deleteExpenses(id: number) {
    return this.httpClient.delete(`${this.Url}/expenses/${id}`, { headers: this.headers });
  }
  setter(expensesID: any) {
    this.expensesID = expensesID;
  }
  getter() {
    return this.expensesID;
  }
}
