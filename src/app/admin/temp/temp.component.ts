import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MedicineModel } from 'src/app/shared/models/products.model';
import { HsnService } from 'src/app/shared/services/hsn.service';
import { InventoryMedicinesService } from 'src/app/shared/services/products.service';
import { TempService } from 'src/app/shared/services/temp.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss']
})
export class TempComponent implements OnInit {
  fileName: any;
  file: File | any = null;
  filePreview: string | any;


  constructor(
    private inventoryMedicinesService: InventoryMedicinesService,
    private hsnService: HsnService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
    // const reader: FileReader = new FileReader();

    // reader.onload = (e: any) => {
    //   var binaryData = e.target.result;
    //   var base64String = window.btoa(binaryData);
    //   const wb = XLSX.read(base64String, { type: 'base64' });
    //   const newFile = XLSX.write(wb, { bookType: 'csv', type: 'binary' });
    //   var col = newFile.toString().split('\n')
    //   col.shift()
    //   col.map((e, i) => {
    //     if (e.split(",").length > 1) {
    //       col[i] = e.split(',')
    //     }
    //   })
    //   if ((col[col.length - 1].length < 2)) {
    //     col.pop()
    //   }
    // }
    // reader.readAsBinaryString(this.file);
  }

  onSubmit() {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      var binaryData = e.target.result;
      var base64String = window.btoa(binaryData);
      const wb = XLSX.read(base64String, { type: 'base64' });
      const newFile = XLSX.write(wb, { bookType: 'csv', type: 'binary' });
      var col = newFile.toString().split('\n')
      col.shift()
      col.map((e, i) => {
        if (e.split(",").length > 1) {
          col[i] = e.split(',')
        }
      })
      if ((col[col.length - 1].length < 2)) {
        col.pop()
      }
      let data = col.map(e => ({
        name: e[0],
        shortName: e[0].substring(0, 3),
        code: e[3],
        gst: e[2],
        hsnTypeId: 1,
        companyId: 1,
        categoryId: 1,
        packing: 1,
        units: e[1],
        created: 1
      }))
      console.log("@@@@@@@@@@", data);

      let hsnTypeId = 1;
      let created = 1;
      let hsn = {}
      this.hsnService.getOrAddHsn(data).subscribe(data => {
        console.log("!!!!!!!!!!!!!!!!!!!!", data);
        return data;
      });

      // this.inventoryMedicinesService.addMedicines(data).subscribe(data => {
      //   if (data) {
      //     this.snackBar.open('Added Successfully!', 'Success', {
      //       duration: 2000,
      //     });
      //   }
      // })
    };
    reader.readAsBinaryString(this.file);
    this.router.navigate(['admin/temp'])
  }

  getHsnId(code: string, gst: string) {
    let hnsId;
    let hsnTypeId = 1;
    let created = 1;
    this.hsnService.getOrAddHsn({ code, gst, hsnTypeId, created }).subscribe(data => {
      console.log("!!!!!!!!!!!!!!!!!!!!", data);
      return data;
    });
  }
}


