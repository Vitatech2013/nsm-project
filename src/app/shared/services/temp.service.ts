import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TempService {
  taxId:number | any
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
  addTemp(temp: any) {
    return this.httpClient.post(`${this.Url}/temp`, temp);
  }
 
}
