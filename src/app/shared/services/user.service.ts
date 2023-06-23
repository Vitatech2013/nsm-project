import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = environment.root;
  userId: number | any;
  public onSelectcount: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }

  addUser(user: any) {
    return this.httpClient.post(`${this.Url}/user`, user);
  }
  getUserById(id: number) {
    return this.httpClient.get(`${this.Url}/user/${id}`);
  }
  getUser() {
    return this.httpClient.get(`${this.Url}/user`);
  }
  updateUser(id: number, user: any) {
    return this.httpClient.patch(`${this.Url}/user/${id}`, user);
  }
  deleteUser(id: number) {
    return this.httpClient.delete(`${this.Url}/user/${id}`, { headers: this.headers });
  }
  updateImage(id: number, files: any) {
    return this.httpClient.put(`${this.Url}/user/image/${id}`, files);
  }
  setter(userId: any) {
    this.userId = userId;
  }
  getter() {
    return this.userId;
  }
}
