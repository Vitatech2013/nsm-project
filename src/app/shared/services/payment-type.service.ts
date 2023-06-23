import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  Url = environment.root;
  paymentTypeId:number | any;
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addPaymentType(payment: any) {
    return this.httpClient.post(`${this.Url}/payment-type`, payment);
  }
  getPaymentTypeById(id: number) {
    return this.httpClient.get(`${this.Url}/payment-type/${id}`);
  }
  getPaymentType() {
    return this.httpClient.get(`${this.Url}/payment-type`);
  }
  updatePaymentType(id: number, payment: any) {
    return this.httpClient.patch(`${this.Url}/payment-type/${id}`, payment);
  }
  deletePaymentType(id: number) {
    return this.httpClient.delete(`${this.Url}/payment-type/${id}`, { headers: this.headers });
  }
  setter(paymentTypeId: any) {
    this.paymentTypeId = paymentTypeId;
  }
  getter() {
    return this.paymentTypeId;
  }
}
