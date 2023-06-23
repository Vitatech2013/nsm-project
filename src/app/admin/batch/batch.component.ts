import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BatchService } from 'src/app/shared/services/batch.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {


  displayedColumns: string[] = [
    'id',
    'batchNumber',
    'name',
    'mrp',
    'packing',
    'expiryDate',
    'qty',
    'purchaseDate',
    'purchasePrice',
    'totalAmount',
    'margin',
  ];
  data: any;
  batchData: any;
  isLoading!: boolean;
  batchForm: FormGroup;
  batchName: any;
  name: any;
  mrp: any;
  unitMrp: any;
  unitPrice: any;
  expiryDate: any;
  shortName: any;
  packing: number;
  mfgDate: any;
  qty: any;
  freeQuantity: any;
  purchaseDate: any;
  purchasePrice: number;
  availableQuantity: any;
  availableUnits: any;
  discount: any;
  disAmount: any;
  companyPTR: any;
  actualCostPrice: any;
  gst: any;
  totalAmount: number;
  margin: any;
  created: any;
  id!: number;
  date: any;
  company: any;
  hsn: any;
  units: number;
  hsnGst: any;
  supplierName: any;
  category: any;
  invoiceNumber: number;
  dataSource: any;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  batchNumber: any;
  selectedRowIndex: any;
  div: boolean;
  totalLength = [5, 10, 25, 50, 100];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @HostListener('window:keydown', ['$event']) spaceEvent(event: any) {
    // if (event.keyCode === 13) {
    //   this.dialogRef.close({ data: this.data });
    // }
     if (event.keyCode === 38) {
      this.arrowUpEvent();
    } else if (event.keyCode === 40) {
      this.arrowDownEvent();
    }
  }

  constructor(
    private batchService: BatchService,
    // public dialogRef: MatDialogRef<BatchComponent>
    ) { }

  ngOnInit(): void {
    console.log(this.noData.image,this.total);
    
    this.ReadBatchDetails();
    // this.div = false;
    this.batchForm = new FormGroup({
      invoiceNumber: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      supplierName: new FormControl('', [Validators.required]),

      batchNumber: new FormControl('', Validators.required),
      mrp: new FormControl('', Validators.required),
      unitMrp: new FormControl('', Validators.required),
      unitPrice: new FormControl('', Validators.required),
      category: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      packing: new FormControl('', [Validators.required]),
      units: new FormControl('', [Validators.required]),
      expiryDate: new FormControl('', Validators.required),
      mfgDate: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required),
      freeQuantity: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      availableQuantity: new FormControl('', Validators.required),
      availableUnits: new FormControl('', Validators.required),
      discount: new FormControl('', Validators.required),
      disAmount: new FormControl('', Validators.required),
      companyPTR: new FormControl('', Validators.required),
      actualCostPrice: new FormControl('', Validators.required),
      gst: new FormControl('', Validators.required),
      totalAmount: new FormControl('', Validators.required),
      margin: new FormControl('', Validators.required),
      created: new FormControl('', Validators.required,),
      company: new FormControl('', Validators.required),
      hsn: new FormControl('', Validators.required),
      hsnGst: new FormControl('', Validators.required,),
    });
  }

  ReadBatchDetails() {
    this.batchService.getBatch().subscribe(data => {
      this.batchData = data;
      console.log(this.batchData);
      
      this.dataSource = new MatTableDataSource(this.batchData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.highlight(this.dataSource.filteredData[0]);
      console.log(this.dataSource.data,this.total);
    });
  }
  setData(){
    this.batchNumber = this.data.batchNumber;
    this.batchForm.get('batchNumber').setValue(this.batchNumber);

    this.name = this.data.product.name;
    this.batchForm.get('name').setValue(this.name);

    this.mrp = this.data.mrp;
    this.batchForm.get('mrp').setValue(this.mrp);

    this.unitMrp = this.data.unitMrp;
    this.batchForm.get('unitMrp').setValue(this.unitMrp);

    this.unitPrice = this.data.unitPrice;
    this.batchForm.get('unitPrice').setValue(this.unitPrice);

    this.units = this.data.product.units;
    // this.batchForm.get('units').setValue(this.units);
    this.packing = this.data.product.packing;
    this.batchForm.get('packing').setValue(this.packing + '*' + this.units);

    this.expiryDate = this.data.expiryDate;
    this.batchForm.get('expiryDate').setValue(this.expiryDate);

    this.batchNumber = this.data.batchNumber;
    this.batchForm.get('batchNumber').setValue(this.batchNumber);

    this.mfgDate = this.data.mfgDate;
    this.batchForm.get('mfgDate').setValue(this.mfgDate);

    this.qty = this.data.quantity;
    this.batchForm.get('qty').setValue(this.qty);

    this.freeQuantity = this.data.freeQuantity;
    this.batchForm.get('freeQuantity').setValue(this.freeQuantity);

    this.purchaseDate = this.data.purchase.createdAt;
    this.batchForm.get('date').setValue(this.purchaseDate);

    this.date = this.data.purchase.purchaseDate;
    this.batchForm.get('purchaseDate').setValue(this.date);


    this.purchasePrice = this.data.purPrice;
    this.batchForm.get('purchasePrice').setValue(this.purchasePrice);

    this.availableQuantity = this.data.availableQuantity;
    this.batchForm.get('availableQuantity').setValue(this.availableQuantity);

    this.availableUnits = this.data.availableUnits;
    this.batchForm.get('availableUnits').setValue(this.availableUnits);

    this.discount = this.data.discount;
    this.batchForm.get('discount').setValue(this.discount);

    this.disAmount = this.data.disAmount;
    this.batchForm.get('disAmount').setValue(this.disAmount);

    this.companyPTR = this.data.companyPTR;
    this.batchForm.get('companyPTR').setValue(this.companyPTR);

    this.actualCostPrice = this.data.actualCostPrice;
    this.batchForm.get('actualCostPrice').setValue(this.actualCostPrice);

    this.gst = this.data.gstValue;
    this.batchForm.get('gst').setValue(this.gst);

    this.totalAmount = this.data.totalAmount;
    this.batchForm.get('totalAmount').setValue(this.totalAmount);

    this.margin = this.data.margin;
    this.batchForm.get('margin').setValue(this.margin);
    
    this.created = this.data.created.fullName;
    this.batchForm.get('created').setValue(this.created);

    this.invoiceNumber = this.data.purchase.purInvoiceNum;
    this.batchForm.get('invoiceNumber').setValue(this.invoiceNumber);
    

    this.company = this.data.product.company.company;
    this.batchForm.get('company').setValue(this.company);

    this.hsn = this.data.product.hsn.code;
    this.batchForm.get('hsn').setValue(this.hsn);
    
    this.hsnGst = this.data.product.hsn.gst;
    this.batchForm.get('hsnGst').setValue(this.hsnGst);

    this.supplierName = this.data.purchase.user.fullName;
    this.batchForm.get('supplierName').setValue(this.supplierName);
  }

  highlight(row: any) {
    this.selectedRowIndex = 1;
    this.data = row;
    this.div= true;
    console.log(this.data);
   this.setData();
    
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

  arrowUpEvent() {
    this.div= true;
    let nextrow = this.dataSource.filteredData[this.selectedRowIndex - 2];
    this.highlight2(nextrow);
    this.data = nextrow;

    console.log(this.data);
    this.setData();
  }

  arrowDownEvent() {
    this.div= true;
    let nextrow = this.dataSource.filteredData[this.selectedRowIndex];
    this.highlight1(nextrow);
    this.data = nextrow;

    // this.selectedRowIndex = i + 1;
    // this.data = row;
    console.log(this.data);
    this.setData();
  }
  onClick(row: any, i) {
    this.div= true;
    this.selectedRowIndex = i + 1;
    this.data = row;
    console.log(this.data);
    this.setData();
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
    this.highlight(this.dataSource.filteredData[0]);
  }
}
