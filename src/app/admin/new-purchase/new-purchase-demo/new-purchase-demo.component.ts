import { MatTableDataSource } from '@angular/material/table';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BatchService } from 'src/app/shared/services/batch.service';
import { InventoryMedicinesService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-new-purchase-demo',
  templateUrl: './new-purchase-demo.component.html',
  styleUrls: ['./new-purchase-demo.component.css']
})
export class NewPurchaseDemoComponent implements OnInit {
   displayedColumns: string[] =
   ['id',
    'batchNumber',
    'productId',
    // 'packing',
    // 'mfgDate',
    'expiryDate',
    'mrp',
    'unitMrp',
    'unitPrice',
    'date',
    'purchasePrice',
    'quantity',
    'freeQuantity',
    'availableQuantity',
    'availableUnits',
    'actualCostPrice',
    'margin'
    ];
selectedRowIndex: any;
dataSource: any;
positoin: number;
data: any;
batchData: any;
Data: any;
  id: any;
  BatchData: any;

@HostListener('window:keydown', ['$event']) spaceEvent(event: any) {
  if (event.keyCode === 13) {
    this.dialogRef.close({ data: this.data });
  }
   else if (event.keyCode === 38) {
    this.arrowUpEvent();
  } else if (event.keyCode === 40) {
    this.arrowDownEvent();
  }
}

constructor(
  private batchService: BatchService,  private medicinesService: InventoryMedicinesService,
  public dialogRef: MatDialogRef<NewPurchaseDemoComponent>
) {}

ngOnInit(): void {
  this.ReadBatchDetails();
}

highlight(row: any) {
  this.selectedRowIndex = 1;
  this.data = row;
}
highlight1(row: any) {
  const i = this.selectedRowIndex + 1;
  if (this.dataSource.filteredData.length >= i && i >= 1){
    this.selectedRowIndex += 1;
    this.data = row;
  }
  else{
    this.selectedRowIndex = this.selectedRowIndex + 1;
  }
}
highlight2(row: any) {
  const i = this.selectedRowIndex + 1;
  if (this.dataSource.filteredData.length >= i && i >= 1){
  this.selectedRowIndex -= 1;
  this.data = row;
  }
  else{
    this.selectedRowIndex = this.selectedRowIndex - 1;
  }
}

onClick(row: any, i) {
  this.BatchData = this.batchService.getter();
 console.log(this.BatchData);
  
  this.selectedRowIndex = i + 1;
  this.data = row;
}

ReadBatchDetails() {
  this.id = this.batchService.getter();
  console.log(this.id);
  this.batchService.getBatchByProductId(this.id).subscribe((data) => {
    console.log(data);
    this.dataSource = data;
    this.dataSource = new MatTableDataSource(this.dataSource);
    console.log(this.dataSource);
    this.highlight(this.dataSource.filteredData[0]);
  });
}

medicineFilter(event: any) {
  this.dataSource.filter = event.target.value.trim().toLowerCase();
  this.highlight(this.dataSource.filteredData[0]);
}

arrowUpEvent() {
  let nextrow = this.dataSource.filteredData[this.selectedRowIndex - 2];
  this.highlight2(nextrow);
  this.data = nextrow;
}

arrowDownEvent() {
  let nextrow = this.dataSource.filteredData[this.selectedRowIndex];
  this.highlight1(nextrow);
  this.data = nextrow;
}
}
