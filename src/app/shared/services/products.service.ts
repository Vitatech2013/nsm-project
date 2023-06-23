import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryMedicinesService {
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addMedicines(medicines: any) {
    return this.httpClient.post(`${this.Url}/medicines`, medicines);
  }
  getMedicinesById(id: number) {
    return this.httpClient.get(`${this.Url}/medicines/${id}`);
  }
  getMedicines() {
    return this.httpClient.get(`${this.Url}/medicines`);
  }
  updateMedicines(id: number, medicines: any) {
    return this.httpClient.put(`${this.Url}/medicines/${id}`, medicines);
  }
  
  deleteMedicines(id: number) {
    return this.httpClient.delete(`${this.Url}/medicines/${id}`, { headers: this.headers });
  }
  getspecialCategory(){
    return this.httpClient.get(`${this.Url}/special-category`);

  }
  getscheduleCategory(){
    return this.httpClient.get(`${this.Url}/schedule-category`);

  }

  getscheduleCategoryById(id: number) {
    return this.httpClient.get(`${this.Url}/schedule-category/${id}`);
  }
  getspecialCategoryById(id: number) {
    return this.httpClient.get(`${this.Url}/special-category/${id}`);
  }
  

  
}
