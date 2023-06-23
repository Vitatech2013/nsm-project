import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosBillService {
  Url = environment.root;
  dataId:number | any;
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addSales(data: any) {
    return this.httpClient.post(`${this.Url}/sales`, data);
  }
  getSalesId(id: number) {
    return this.httpClient.get(`${this.Url}/sales/${id}`);
  }
  getSales() {
    return this.httpClient.get(`${this.Url}/sales`);
  }
  updateSales(id: number, data: any) {
    return this.httpClient.patch(`${this.Url}/sales${id}`, data);
  }
  deleteSales(id: number) {
    return this.httpClient.delete(`${this.Url}/sales${id}`, { headers: this.headers });
  }
  setter(dataId: any) {
    this.dataId = dataId;
  }
  getter() {
    return this.dataId;
  }
}
