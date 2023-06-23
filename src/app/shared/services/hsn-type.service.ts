import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HsnTypeService {
  Url = environment.root;
  hsnTypeId: number | any;
  public onSelectsale: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

 
  getHsnTypById(id: number) {
    return this.httpClient.get(`${this.Url}/hsn-type/${id}`);
  }
  getHsnTyp() {
    return this.httpClient.post(`${this.Url}/hsn-type`, { headers: this.headers });
  }
  
  setter(hsnTypeId: any) {
    this.hsnTypeId = hsnTypeId;
  }
  getter() {
    return this.hsnTypeId;
  }
}
