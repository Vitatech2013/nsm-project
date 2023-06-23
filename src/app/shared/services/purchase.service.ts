import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  Url = environment.root;
  catId:any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');

  addPurchase(purchase: any) {
    return this.httpClient.post(`${this.Url}/purchase`, purchase);
  }
  addPurchaseReturn(Return: any) {
    return this.httpClient.post(`${this.Url}/purchase-return`, Return);
  }
  getPurchaseById(id: number) {
    return this.httpClient.get(`${this.Url}/purchase/${id}`);
  }
  getPurchaseByUserId(id: number) {
    return this.httpClient.get(`${this.Url}/purchase/user/${id}`);
  }
  getPurchase() {
    return this.httpClient.get(`${this.Url}/purchase`);
  }
  getPurchaseReports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/purchase/reports`, {fromDate, toDate});
  }
  updatePurchase(id: number, purchase: any) {
    return this.httpClient.patch(`${this.Url}/purchase/${id}`, purchase);
  }
  updatePurchaseAmount(id: number, purchase: any) {
    return this.httpClient.patch(`${this.Url}/purchase/amount/${id}`, purchase);
  }
  updateSinglePurchaseAmount(id: number, purchase: any) {
    return this.httpClient.patch(`${this.Url}/purchase/updateAmount/${id}`, purchase);
  }
  deletePurchase(id: number) {
    return this.httpClient.delete(`${this.Url}/purchase/${id}`, { headers: this.headers });
  }
  setter(catId: any) {
    this.catId = catId;
  }
  getter() {
    return this.catId;
  }
}
