import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MedicineCategoryService {
  Url = environment.root;
  catId:any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');

  addCategory(category: any) {
    return this.httpClient.post(`${this.Url}/category`, category);
  }
  getCategoryById(id: number) {
    return this.httpClient.get(`${this.Url}/category/${id}`);
  }
  getCategory() {
    return this.httpClient.get(`${this.Url}/category`);
  }
  getCategoryStatus() {
    return this.httpClient.get(`${this.Url}/category/status`);
  }
  updateCategory(id: number, category: any) {
    return this.httpClient.patch(`${this.Url}/category/${id}`, category);
  }
  deleteCategory(id: number) {
    return this.httpClient.delete(`${this.Url}/category/${id}`, { headers: this.headers });
  }

  setter(catId: any) {
    this.catId = catId;
  }
  getter() {
    return this.catId;
  }
  
}
