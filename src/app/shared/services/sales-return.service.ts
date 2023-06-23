import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesReturnService {
  Url = environment.root;
  dataId:number | any;
  public onSelectSalesReturn: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addSalesReturn(data: any) {
    return this.httpClient.post(`${this.Url}/sales-return`, data);
  }
  getSalesReturnId(id: number) {
    return this.httpClient.get(`${this.Url}/sales-return/${id}`);
  }
  getSalesReturn() {
    return this.httpClient.get(`${this.Url}/sales-return`);
  }
  // getSalesByInvoiceNum(invoiceNum: string) {
  //   return this.httpClient.get(`${this.Url}/sales-return/sales/${invoiceNum}`);
  // }
  getSalesByInvoiceNum(invoiceNum:any) {
    console.log(invoiceNum)
    return this.httpClient.post(`${this.Url}/sales-return/sales/invoicedata`,invoiceNum);
  }
  updateSalesReturn(id: number, data: any) {
    return this.httpClient.patch(`${this.Url}/sales-return${id}`, data);
  }
  deleteSalesReturn(id: number) {
    return this.httpClient.delete(`${this.Url}/sales-return${id}`, { headers: this.headers });
  }
  setter(dataId: any) {
    this.dataId = dataId;
  }
  getter() {
    return this.dataId;
  }

}
