import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HsnService {

  Url = environment.root;
  hsnId: number | any;
  public onSelectHSN: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addHSN(hsn: any) {
    return this.httpClient.post(`${this.Url}/hsn`, hsn);
  }
  getOrAddHsn(hsn: any) {
    return this.httpClient.post(`${this.Url}/hsn/getOrAddHsn`, hsn);
  }
  getHSNById(id: number) {
    return this.httpClient.get(`${this.Url}/hsn/${id}`);
  }
  getHSN() {
    return this.httpClient.get(`${this.Url}/hsn`);
  }
  updateHSN(id: number, hsn: any) {
    return this.httpClient.patch(`${this.Url}/hsn/${id}`, hsn);
  }
  deleteHSN(id: number) {
    return this.httpClient.delete(`${this.Url}/hsn/${id}`, { headers: this.headers });
  }
  setter(HSNId: any) {
    this.hsnId = HSNId;
  }
  getter() {
    return this.hsnId;
  }
}
