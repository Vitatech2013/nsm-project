import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddPurchaseService {
  EData = [];

  constructor() {}

  setData(data: any) {
    // if (this.EData[0]) {
    //   console.log('working');
    //   this.EData.map((eData) => {
    //     console.log(data);
    //     console.log(eData.id, data.id);
    //     if (eData.id === data.id) {
    //       console.log('update working');
    //       console.log(eData);
    //       this.EData.filter((fData) => {
    //         return fData.id !== data.id;
    //       });
    //     }
    //     this.EData.push(data);
    //   });
    // } else {
      this.EData.push(data);
    // }
  }

  public get(): any {
    return this.EData;
  }

  deleteItem(id: string) {
    this.EData = this.EData.filter((value, key) => {
      return value.id !== id;
    });
    return this.EData;
  }
}
