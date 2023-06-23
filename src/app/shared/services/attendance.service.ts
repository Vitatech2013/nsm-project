import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  Url = environment.root;
  attendanceId:number | any;
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  addAttendance(attendance: any) {
    return this.httpClient.post(`${this.Url}/attendance`, attendance);
  }
  getAttendanceById(id: number) {
    return this.httpClient.get(`${this.Url}/attendance/${id}`);
  }
  getAttendance() {
    return this.httpClient.get(`${this.Url}/attendance`);
  }
  updateAttendance(id: number, attendance: any) {
    return this.httpClient.patch(`${this.Url}/attendance/${id}`, attendance);
  }
  deleteAttendance(id: number) {
    return this.httpClient.delete(`${this.Url}/attendance/${id}`, { headers: this.headers });
  }
  getAttendanceByEid(id: number) {
    return this.httpClient.get(`${this.Url}/attendance/employee/${id}`);
  }
  getAttendanceByDate() {
    return this.httpClient.post(`${this.Url}/attendance/date`,{ headers: this.headers });
  }
  getAttendanceDataByDate(date:string) {
    
    return this.httpClient.post(`${this.Url}/attendance/byDate/${date}`,{ headers: this.headers });
  }
  setter(attendanceId: any) {
    this.attendanceId = attendanceId;
  }
  getter() {
    return this.attendanceId;
  }

}
