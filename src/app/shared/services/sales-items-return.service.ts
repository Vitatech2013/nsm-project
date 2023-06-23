import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesItemsReturnService {
  Url = environment.root;
  saleItemsReturnId: number | any;
  public onSelectsaleItemReturn: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addSaleItemsReturn(saleItems: any) {
    return this.httpClient.post(`${this.Url}/sales-item-return`, saleItems);
  }
  getSaleItemsByIdReturn(id: number) {
    return this.httpClient.get(`${this.Url}/sales-item-return/${id}`);
  }
  getSaleItemsReturn() {
    return this.httpClient.get(`${this.Url}/sales-item-return`);
  }
  getSaleItemBySalesReturnId(id: number) {
    return this.httpClient.get(`${this.Url}/sales-item-return/sales-return/${id}`);
  }
  // getSalesReturn() {
  //   return this.httpClient.get(`${this.Url}/sales`);
  // }
  // getSaleReportsReturn(fromDate: string, toDate: string) {
  //   return this.httpClient.post(`${this.Url}/sales/reports`, {fromDate, toDate});
  // }
  // getSaleItemsReportsReturn(fromDate: string, toDate: string) {
  //   return this.httpClient.post(`${this.Url}/sale-items/reports`, {fromDate, toDate});
  // }
  updateSaleItemsReturn(id: number, saleItems: any) {
    return this.httpClient.patch(`${this.Url}/sales-item-return/${id}`, saleItems);
  }
  deleteSaleItemsReturn(id: number) {
    return this.httpClient.delete(`${this.Url}/sales-item-return/${id}`, { headers: this.headers });
  }
  setter(saleItemsReturnId: any) {
    this.saleItemsReturnId = saleItemsReturnId;
  }
  getter() {
    return this.saleItemsReturnId;
  }
}
