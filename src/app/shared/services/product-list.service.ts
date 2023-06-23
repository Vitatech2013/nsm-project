import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addproduct(product: any) {
    return this.httpClient.post(`${this.Url}/product-list`, product);
  }

  getProduct() {
    return this.httpClient.get(`${this.Url}/product-list`);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.Url}/product-list/${id}`, { headers: this.headers });
  }

}

