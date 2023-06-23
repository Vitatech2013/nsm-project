import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  taxId:number | any
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
  addTaxes(taxes: any) {
    return this.httpClient.post(`${this.Url}/taxes`, taxes);
  }
  getTaxesById(id: number) {
    return this.httpClient.get(`${this.Url}/taxes/${id}`);
  }
  getTaxes() {
    return this.httpClient.get(`${this.Url}/taxes`);
  }
  updateTaxes(id: number, taxes: any) {
    return this.httpClient.patch(`${this.Url}/taxes/${id}`, taxes);
  }
  deleteTaxes(id: number) {
    return this.httpClient.delete(`${this.Url}/taxes/${id}`, { headers: this.headers });
  }
  setter(taxId: any) {
    this.taxId = taxId;
  }
  getter() {
    return this.taxId;
  }
}
