import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceSheetService {
  Url = environment.root;
  balancesheetId: number | any;
  public onSelectbalancesheet: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addBalanceSheet(balancesheet: any) {
    return this.httpClient.post(`${this.Url}/balance-sheet`, balancesheet);
  }
  getBalanceSheetById(id: number) {
    return this.httpClient.get(`${this.Url}/balance-sheet/${id}`);
  }
  getBalanceSheetByUserId(id: number) {
    return this.httpClient.get(`${this.Url}/balance-sheet/user/${id}`);
  }
  getBalanceSheet() {
    return this.httpClient.get(`${this.Url}/balance-sheet`);
  }
  updateBalanceSheet(id: number, balancesheet: any) {
    return this.httpClient.patch(`${this.Url}/balance-sheet/${id}`, balancesheet);
  }
  deleteBalanceSheet(id: number) {
    return this.httpClient.delete(`${this.Url}/balance-sheet/${id}`, { headers: this.headers });
  }
  setter(balancesheetId: any) {
    this.balancesheetId = balancesheetId;
  }
  getter() {
    return this.balancesheetId;
  }
}
