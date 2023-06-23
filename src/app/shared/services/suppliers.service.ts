import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addSuppliers(suppliers: any) {
    return this.httpClient.post(`${this.Url}/suppliers`, suppliers);
  }
  getSuppliersById(id: number) {
    return this.httpClient.get(`${this.Url}/suppliers/${id}`);
  }
  getSuppliersByUserId(id: number) {
    return this.httpClient.get(`${this.Url}/suppliers/user/${id}`);
  }
  getSuppliers() {
    return this.httpClient.get(`${this.Url}/suppliers`);
  }
  updateSuppliers(id: number, suppliers: any) {
    return this.httpClient.patch(`${this.Url}/suppliers/${id}`, suppliers);
  }
  deleteSuppliers(id: number) {
    return this.httpClient.delete(`${this.Url}/suppliers/${id}`, { headers: this.headers });
  }
}
