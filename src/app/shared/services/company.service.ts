import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  Url = environment.root;
  companyId: number | any;
  public onSelectCompany: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addCompany(company: any) {
    return this.httpClient.post(`${this.Url}/company`, company);
  }
  getCompanyById(id: number) {
    return this.httpClient.get(`${this.Url}/company/${id}`);
  }
  getCompany() {
    return this.httpClient.get(`${this.Url}/company`);
  }
  updateCompany(id: number, company: any) {
    return this.httpClient.patch(`${this.Url}/company/${id}`, company);
  }
  deleteCompany(id: number) {
    return this.httpClient.delete(`${this.Url}/company/${id}`, { headers: this.headers });
  }
  setter(cmpId: any) {
    this.companyId = cmpId;
  }
  getter() {
    return this.companyId;
  }
}
