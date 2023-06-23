import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient: HttpClient) { }
  addDoctors(doctors: any) {
    console.log(doctors);
    
    return this.httpClient.post(`${this.Url}/doctors`, doctors);
  }
  getDoctorsById(id: number) {
    return this.httpClient.get(`${this.Url}/doctors/${id}`);
  }
  getDoctors() {
    return this.httpClient.get(`${this.Url}/doctors`);
  }
  updateDoctors(id: number, doctors: any) {
    console.log(doctors);
    return this.httpClient.patch(`${this.Url}/doctors/${id}`, doctors);
  }
  deleteDoctors(id: number) {
    return this.httpClient.delete(`${this.Url}/doctors/${id}`, { headers: this.headers });
  }
  updateImage(id: number, files: any) {
    return this.httpClient.put(`${this.Url}/doctors/image/${id}`, files);
  }

}
