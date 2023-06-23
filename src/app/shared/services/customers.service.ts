import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addCustomers(customers: any) {
    return this.httpClient.post(`${this.Url}/customers`, customers);
  }
  getCustomersById(id: number) {
    return this.httpClient.get(`${this.Url}/customers/${id}`);
  }
  getCustomers() {
    return this.httpClient.get(`${this.Url}/customers`);
  }
  updateCustomers(id: number, customers: any) {
    return this.httpClient.patch(`${this.Url}/customers/${id}`, customers);
  }
  deleteCustomers(id: number) {
    return this.httpClient.delete(`${this.Url}/customers/${id}`, { headers: this.headers });
  }
  
}
