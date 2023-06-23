import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesItemsService {

  Url = environment.root;
  saleItemsId: number | any;
  public onSelectsale: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
 


  constructor(private httpClient: HttpClient) { }

  addSaleItems(saleItems: any) {
    return this.httpClient.post(`${this.Url}/sale-items`, saleItems);
  }
  getSaleItemsById(id: number) {
    return this.httpClient.get(`${this.Url}/sale-items/${id}`);
  }
  getSaleItems() {
    return this.httpClient.get(`${this.Url}/sale-items`);
  }
  getSaleItemsSaleById(id: number) {
    return this.httpClient.get(`${this.Url}/sale-items/sales/${id}`);
  }
  getSales() {
    return this.httpClient.get(`${this.Url}/sales`);
  }
  getSalesById(data: any){
    return this.httpClient.post(`${this.Url}/sales/getSalesByUserAndDate`, data);
  }
  getMonthlySalesById(data: any){
    return this.httpClient.post(`${this.Url}/sales/getMonthlySales`, data);
  }
  getNewSalesById(data: any){
    return this.httpClient.post(`${this.Url}/sales/getSalesByUserAndDate_V1`, data);
  }
  getNewSalesItemBySaleId(id: number) {
    return this.httpClient.get(`${this.Url}/sales/getSalesByUserId_V1/${id}`);
  }
  getSalesItemsByUserAndDate(data: any){
    return this.httpClient.post(`${this.Url}/sale-items/getSaleItemsByUserAndDate`, data);
  }
  getSaleReports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/sales/reports`, {fromDate, toDate});
  }
  getSaleItemsReports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/sale-items/reports`, {fromDate, toDate});
  }
  
  updateSaleItems(id: number, saleItems: any) {
    return this.httpClient.patch(`${this.Url}/sale-items/${id}`, saleItems);
  }
  deleteSaleItems(id: number) {
    return this.httpClient.delete(`${this.Url}/sale-items/${id}`, { headers: this.headers });
  }
  setter(saleItemsId: any) {
    this.saleItemsId = saleItemsId;
  }
  getter() {
    return this.saleItemsId;
  }
}
