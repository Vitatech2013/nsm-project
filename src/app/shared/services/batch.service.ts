import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  Url = environment.root;
  bId: number | any;
  data:any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addBatch(batch: any) {
    return this.httpClient.post(`${this.Url}/batch`, batch);
  }
  getBatchById(id: number) {
    return this.httpClient.get(`${this.Url}/batch/${id}`);
  }
  getBatch() {
    return this.httpClient.get(`${this.Url}/batch`);
  }
  updateBatch(id: number, batch: any) {
    return this.httpClient.patch(`${this.Url}/batch/${id}`, batch);
  }
  updateUnits(id: number, batch: any) {
    return this.httpClient.patch(`${this.Url}/batch/units/${id}`, batch);
  }
  deleteBatch(id: number) {
    return this.httpClient.delete(`${this.Url}/batch/${id}`, { headers: this.headers });
  }
  getBatchByPurchaseId(id: number) {
    return this.httpClient.get(`${this.Url}/batch/purchase/${id}`);
  }
  getBatchByProductId(id: number) {
    return this.httpClient.get(`${this.Url}/batch/product/${id}`);
  }
  getpurchaseItemsReports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/batch/reports`, {fromDate, toDate});
  }
  setter(bId: any) {
    this.bId = bId;
    
  }
  getter() {
    return this.bId;
    // return this.data;
  }
}
