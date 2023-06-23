import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeboardService {
  Url = environment.root;
  noticeBoardId:number | any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient) { }

  addNoticeBoard(noticeBoard: any) {
    return this.httpClient.post(`${this.Url}/noticeboard`, noticeBoard);
  }
  getNoticeBoardById(id: number) {
    return this.httpClient.get(`${this.Url}/noticeboard/${id}`);
  }
  getNoticeBoard() {
    return this.httpClient.get(`${this.Url}/noticeboard`);
  }
  updateNoticeBoard(id: number, noticeBoard: any) {
    return this.httpClient.patch(`${this.Url}/noticeboard/${id}`, noticeBoard);
  }
  deleteNoticeBoard(id: number) {
    return this.httpClient.delete(`${this.Url}/noticeboard/${id}`, { headers: this.headers });
  }
  setter(noticeBoardId: any) {
    this.noticeBoardId = noticeBoardId;
  }
  getter() {
    return this.noticeBoardId;
  }
}
