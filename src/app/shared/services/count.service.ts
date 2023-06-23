import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  Url = environment.root;
  countId: number | any;
  public onSelectcount: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addCount(count: any) {
    return this.httpClient.post(`${this.Url}/count`, count);
  }
  getCountById(id: number) {
    return this.httpClient.get(`${this.Url}/count/${id}`);
  }
  getCount() {
    return this.httpClient.get(`${this.Url}/count`);
  }
  updateCount(id: number, count: any) {
    return this.httpClient.patch(`${this.Url}/count/${id}`, count);
  }
  deleteCount(id: number) {
    return this.httpClient.delete(`${this.Url}/count/${id}`, { headers: this.headers });
  }
  setter(countId: any) {
    this.countId = countId;
  }
  getter() {
    return this.countId;
  }
}