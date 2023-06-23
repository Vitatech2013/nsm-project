import { number } from '@amcharts/amcharts4/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { BalanceSheetModel } from 'src/app/shared/models/balance-sheet.model';
import { BatchModel } from 'src/app/shared/models/batch.model';
import { MedicineModel } from 'src/app/shared/models/products.model';
import { PurchaseModel } from 'src/app/shared/models/purchase.model';
import { SupplierModel } from 'src/app/shared/models/supplier.model';
import { BalanceSheetService } from 'src/app/shared/services/balance-sheet.service';
import { BatchService } from 'src/app/shared/services/batch.service';
import { InventoryMedicinesService } from 'src/app/shared/services/products.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { SuppliersService } from 'src/app/shared/services/suppliers.service';
import { SalesDemoComponent } from '../../admin/sales-demo/sales-demo.component';
import { NewPurchaseDemoComponent } from './new-purchase-demo/new-purchase-demo.component';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss']
})
export class NewPurchaseComponent implements OnInit {

  buttons = true;
  sId: number;
  userId: number;
  createdBy: number;
  id: number;
  minDate: Date;
  maxDate: Date;
  mfgMinDate: Date;
  mfgMaxDate: Date;
  purchaseData: PurchaseModel | any;
  batchData: BatchModel | any;
  suppliers: SupplierModel | any;
  suppliersData: any;
  supplierAddress1: string;
  supplierName: string;
  supplierAddress2: string;
  supplierAddress3: string;
  medicines: MedicineModel | any;
  balanceSheetData: BalanceSheetModel[];
  userBalance = 0;
  medicinesData: any;
  dataSource: MatTableDataSource<BatchModel>;
  tDis = false;
  gstPrice0 = 0;
  gstPrice5 = 0;
  gstPrice12 = 0;
  gstPrice18 = 0;
  gstPrice28 = 0;
  totalGstPrice = 0;
  totalDiscount = 0;
  totallength: number;
  gstValue0 = 0;
  gstValue5 = 0;
  gstValue12 = 0;
  gstValue18 = 0;
  gstValue28 = 0;


  discountPrice = 0;
  amount = 0;
  purAmount = 0;
  purDisAmount = 0;
  netAmount = 0;
  total = 0.00;

  Amount = [];
  MarginValue = [];
  date = [];
  mDate = [];
  hsn = [];
  gst = [];
  packing = [];
  units = [];
  shortName = [];
  productName = [];
  Mrp = [];
  BatchNum = [];
  PurchaseAmount = [];
  Quantity = [];
  FreeQuantity = [];
  DiscountAmount = [];
  DiscountType = [];
  batchData3: any;
  div: boolean;
  pid: number;
  data: any;
  index= 0;
  displayedColumns: string[] = [
    'name',
    'batch',
    'packing',
    'units',
    'mrp',
    'purchasePrice',
    'mfgDate',
    'expiry',
    'qty',
    'freeQuantity',
    'discount',
    'price',
    'gst',
    'hsn',
    'margin',
    // 'actions',
  ];
  simpleDialog: MatDialogRef<SalesDemoComponent> | undefined;
  simpleDialog1: MatDialogRef<NewPurchaseDemoComponent> | undefined;

purchaseForm = new FormGroup({
  purInvoiceNum: new FormControl('', Validators.required),
  purchaseDate: new FormControl('', Validators.required),
  description: new FormControl(''),
  // userId: new FormControl('', Validators.required),
  amount: new FormControl('', Validators.required),
  billType: new FormControl('credit'),
  disType: new FormControl('percentage', Validators.required),
  discount: new FormControl(0, Validators.required),
  totalAmount: new FormControl('', Validators.required),
  created: new FormControl('', Validators.required),
});

  constructor( private purchaseService: PurchaseService,
               private suppliersService: SuppliersService,
               private medicineService: InventoryMedicinesService,
               private batchService: BatchService,
               private router: Router,
               private snackBar: MatSnackBar,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               public dialog: MatDialog,
               private balanceSheetService: BalanceSheetService
  ) {
    const users: any = [];
    this.dataSource = new MatTableDataSource(users);
    // this.dataSource.data.push(this.createNewUser());
  }

  @HostListener('window:keydown', ['$event']) spaceEvent(event: any) {
    if (event.keyCode === 8) {
      // backSpace
      this.addRow();
    }
     else if (event.keyCode === 32 ) {
       // Space
       if (this.index){
        this.openDialog(this.index);
       }
       else if (this.id){
        this.BatchopenDialog(this.index, this.id, this.medicinesData);
       }
    }
     else if (event.keyCode === 13) {
       // enter
     }
     else if (event.keyCode === 9) {
       // Tab
      // this.BatchopenDialog(this.index, this.id, this.medicinesData);
    }
}
  ngOnInit(): void {
    this.mDate.push(new FormControl());
    this.MarginValue.push(new FormControl());
    this.productName.push(new FormControl());
    this.date.push(new FormControl());
    this.Amount.push(new FormControl());
    this.hsn.push(new FormControl());
    this.gst.push(new FormControl());
    this.shortName.push(new FormControl());
    this.packing.push(new FormControl());
    this.Mrp.push(new FormControl());
    this.BatchNum.push(new FormControl());
    this.PurchaseAmount.push(new FormControl());
    this.Quantity.push(new FormControl());
    this.FreeQuantity.push(new FormControl());
    this.DiscountAmount.push(new FormControl());
    this.DiscountType.push(new FormControl());




    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth + 3);
    this.maxDate = new Date(currentYear + 3, currentMonth);
    this.mfgMinDate = new Date(currentYear - 25, currentMonth);
    this.mfgMaxDate = new Date(currentYear + 0, currentMonth);

    this.createdBy = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.medicineService.getMedicines().subscribe(data => {
    this.medicines = data;
    this.medicinesData = data;
    this.medicinesData = new MatTableDataSource(this.medicinesData);
  });
    this.suppliersService.getSuppliers().subscribe(data => {
    this.suppliers = data;
    this.suppliersData = data;
    this.suppliersData = new MatTableDataSource(this.suppliersData);
  });
    this.intForm();
  }


openDialog(index: number) {
  // this.dataSource.data.push(this.createNewUser());
  // this.addRow();
  this.simpleDialog = this.dialog.open(SalesDemoComponent, {
    width: '80%'
  });
  this.simpleDialog.afterClosed().subscribe(res => {
  console.log(res.data);

  this.medicineService.getMedicinesById(res.data.id).subscribe(data => {

      this.Amount.push(new FormControl());
      this.PurchaseAmount.push(new FormControl());
      this.Quantity.push(new FormControl());
      this.FreeQuantity.push(new FormControl());
      this.DiscountAmount.push(new FormControl());
      this.DiscountType.push(new FormControl());
      console.log(data);
      this.medicinesData = data;
      console.log('index', index);

      this.packing.push(new FormControl());
      this.packing[index].setValue(res.data.packing);
      this.dataSource.data[index].packing = res.data.packing;

      this.units.push(new FormControl());
      this.units[index].setValue(res.data.units);
      this.dataSource.data[index].units = res.data.units;

      this.productName.push(new FormControl());
      this.productName[index].setValue(res.data.name);
      this.dataSource.data[index].name = res.data.name;

      this.gst.push(new FormControl());
      this.gst[index].setValue(this.medicinesData.hsn.gst);
      this.dataSource.data[index].gst = this.medicinesData.hsn.gst;

      this.hsn.push(new FormControl());
      this.hsn[index].setValue(this.medicinesData.hsn.code);
      this.dataSource.data[index].hsn = this.medicinesData.hsn.code;

      this.MarginValue.push(new FormControl());
      this.MarginValue[index].setValue(res.data.margin);
      this.dataSource.data[index].margin = res.data.margin;

      this.Mrp.push(new FormControl());
      this.Mrp[index].setValue(res.data.mrp);
      this.dataSource.data[index].mrp = res.data.mrp;

      this.BatchNum.push(new FormControl());
      this.BatchNum[index].setValue(res.data.batchNumber);
      this.dataSource.data[index].batchNumber = res.data.batchNumber;

      this.shortName.push(new FormControl());
      this.shortName[index].setValue(res.data.shortName);
      this.dataSource.data[index].shortName = res.data.shortName;

      this.mDate.push(new FormControl());
      this.mDate[index].setValue(res.data.mfgDate);
      this.dataSource.data[index].mfgDate = res.data.mfgDate;

      this.date.push(new FormControl());
      this.date[index].setValue(res.data.expiryDate);
      this.dataSource.data[index].expiryDate = res.data.expiryDate;
      this.dataSource.data[index]['productId'] = res.data.id;
      this.pid = res.data.id;
      console.log(this.dataSource.data[index]['productId'], this.pid);

    });
  //   this.batchService.getBatchByProductId(res.data.id).subscribe(data => {
  //     this.batchData3 = data;
  //     this.batchData3 = new MatTableDataSource(this.batchData3);
  //   });
  // this.div = true
  });

}

BatchopenDialog(index: number, id: any, medicinesData: any) {
  console.log(medicinesData);
  medicinesData = this.medicinesData;
  console.log(medicinesData);
  this.batchService.setter(this.pid);
  console.log(this.pid);
  this.simpleDialog1 = this.dialog.open(NewPurchaseDemoComponent, {
    width: '80%'
  });
  this.simpleDialog1.afterClosed().subscribe(res => {
    console.log(res.data);
    console.log(res.data.batchNumber);
    console.log (this.dataSource.data[index].name, this.dataSource.data[index].batchNumber);
    let added = false;
    if (!this.dataSource.data[0]) {

    //  this.batchService.getBatchByProductId(this.pid).subscribe(data => {
      this.medicinesData = res.data;
      this.Amount.push(new FormControl());
      this.PurchaseAmount.push(new FormControl());
      this.Quantity.push(new FormControl());
      this.FreeQuantity.push(new FormControl());
      this.DiscountAmount.push(new FormControl());
      this.DiscountType.push(new FormControl());
      this.packing.push(new FormControl());

      // this.packing[index].setValue(res.data.packing);
      // this.dataSource.data[index].packing = res.data.packing;

      // this.units.push(new FormControl());
      // this.units[index].setValue(res.data.units);
      // this.dataSource.data[index].units = res.data.units;
      // this.productName.push(new FormControl())
      // this.productName[index].setValue(res.data.name)
      // this.dataSource.data[index].name = res.data.name
      this.gst.push(new FormControl());
      this.gst[index].setValue(this.medicinesData.product.hsn.gst);
      this.dataSource.data[index].gst = this.medicinesData.product.hsn.gst;

      this.hsn.push(new FormControl());
      this.hsn[index].setValue(this.medicinesData.product.hsn.code);
      this.dataSource.data[index].hsn = this.medicinesData.product.hsn.code;

      this.MarginValue.push(new FormControl());
      this.MarginValue[index].setValue(res.data.margin);
      this.dataSource.data[index].margin = res.data.margin;

      this.Mrp.push(new FormControl());
      this.Mrp[index].setValue(res.data.mrp);
      this.dataSource.data[index].mrp = res.data.mrp;

      this.BatchNum.push(new FormControl());
      this.BatchNum[index].setValue(res.data.batchNumber);
      this.dataSource.data[index].batchNumber = res.data.batchNumber;

      this.shortName.push(new FormControl());
      this.shortName[index].setValue(res.data.shortName);
      this.dataSource.data[index].shortName = res.data.shortName;

      this.mDate.push(new FormControl());
      this.mDate[index].setValue(res.data.mfgDate);
      this.dataSource.data[index].mfgDate = res.data.mfgDate;

      this.date.push(new FormControl());
      this.date[index].setValue(res.data.expiryDate);
      this.dataSource.data[index].expiryDate = res.data.expiryDate;

      this.dataSource.data[index]['productId'] = res.data.product.id;

    }
    else {
      added = false;

      // this.selectedRowIndex = i + 1;
      this.dataSource.data.map((e, index) => {
        this.dataSource.data[index]['id'] = e.id;
        if (e.name === res.data.name && e.batchNumber === res.data.batchNumber) {
        added = true;
        alert('Product Already Exist');

          }
        });
      if (!added){
            console.log('else working');
            this.medicinesData = res.data;
            this.Amount.push(new FormControl());
            this.PurchaseAmount.push(new FormControl());
            this.Quantity.push(new FormControl());
            this.FreeQuantity.push(new FormControl());
            this.DiscountAmount.push(new FormControl());
            this.DiscountType.push(new FormControl());

            // this.packing.push(new FormControl());
            // this.packing[index].setValue(res.data.packing);
            // this.dataSource.data[index].packing = res.data.packing;

            // this.units.push(new FormControl());
            // this.units[index].setValue(res.data.units);
            // this.dataSource.data[index].units = res.data.units;
            // this.productName.push(new FormControl())
            // this.productName[index].setValue(res.data.name)
            // this.dataSource.data[index].name = res.data.name
            this.gst.push(new FormControl());
            this.gst[index].setValue(this.medicinesData.product.hsn.gst);
            this.dataSource.data[index].gst = this.medicinesData.product.hsn.gst;
            this.hsn.push(new FormControl());

            this.hsn[index].setValue(this.medicinesData.product.hsn.code);
            this.dataSource.data[index].hsn = this.medicinesData.product.hsn.code;
            this.MarginValue.push(new FormControl());

            this.MarginValue[index].setValue(res.data.margin);
            this.dataSource.data[index].margin = res.data.margin;
            this.Mrp.push(new FormControl());
            this.Mrp[index].setValue(res.data.mrp);
            this.dataSource.data[index].mrp = res.data.mrp;

            this.BatchNum.push(new FormControl());
            this.BatchNum[index].setValue(res.data.batchNumber);
            this.dataSource.data[index].batchNumber = res.data.batchNumber;

            this.shortName.push(new FormControl());
            this.shortName[index].setValue(res.data.shortName);
            this.dataSource.data[index].shortName = res.data.shortName;

            this.mDate.push(new FormControl());
            this.mDate[index].setValue(res.data.mfgDate);
            this.dataSource.data[index].mfgDate = res.data.mfgDate;

            this.date.push(new FormControl());
            this.date[index].setValue(res.data.expiryDate);
            this.dataSource.data[index].expiryDate = res.data.expiryDate;

            this.dataSource.data[index]['productId'] = res.data.product.id;

          }
        }
});
//  });
}

intForm() {
  if (this.id) {
    this.buttons = false;
    this.tDis = true;
    this.purchaseService.getPurchaseById(this.id).subscribe(data => {
      this.purchaseData = data;
      this.suppliersService.getSuppliersByUserId(this.purchaseData.user.id).subscribe(data => {
        this.suppliersData = data;
        this.suppliersData.map(e => {
          this.supplierName = e.user.fullName;
          this.supplierAddress1 = e.address + ',';
          this.supplierAddress2 = e.city + ',';
          this.supplierAddress3 = e.pin + '.';
          this.userId = e.user.id;
        });
      });
      this.amount = this.purchaseData.subTotal;
      this.purAmount = this.purchaseData.amount;
      this.discountPrice = this.purchaseData.itemDisAmount;
      this.purDisAmount = this.purchaseData.disAmount;
      this.netAmount = this.purchaseData.netAmount;
      this.total = this.purchaseData.totalAmount;
      this.totalGstPrice = this.purchaseData.taxAmount;
      this.totalDiscount = this.purchaseData.discount;
      let date = this.purchaseData.purchaseDate;
      this.purchaseForm = new FormGroup({
        purInvoiceNum: new FormControl(this.purchaseData.purInvoiceNum, Validators.required),
        purchaseDate: new FormControl(date.toString().split('T')[0], Validators.required),
        description: new FormControl(this.purchaseData.description),
        billType: new FormControl(this.purchaseData.billType),
        disType: new FormControl(this.purchaseData.disType, Validators.required),
        discount: new FormControl(this.purchaseForm.value.discount, Validators.required),
      });
      this.batchService.getBatchByPurchaseId(this.id).subscribe(data => {
        this.batchData = data;
        console.log(this.batchData);
        this.dataSource = new MatTableDataSource(this.batchData);
        this.dataSource.data.map((e, index) => {
          this.medicinesData = e.product;
          this.gst.push(new FormControl());
          this.gst[index].setValue(this.medicinesData.hsn.gst);
          this.dataSource.data[index].gst = this.medicinesData.hsn.gst;

          this.hsn.push(new FormControl());
          this.hsn[index].setValue(this.medicinesData.hsn.code);
          this.dataSource.data[index].hsn = this.medicinesData.hsn.code;

          this.productName.push(new FormControl());
          this.productName[index].setValue(e.name);
          this.dataSource.data[index].name = e.name;

          this.packing.push(new FormControl());
          this.packing[index].setValue(e.packing);
          this.dataSource.data[index].packing = e.packing;

          this.units.push(new FormControl());
          this.units[index].setValue(e.units);
          this.dataSource.data[index].units = e.units;

          this.MarginValue.push(new FormControl());
          this.MarginValue[index].setValue(e.margin);
          this.dataSource.data[index].margin = e.margin;
          this.Mrp.push(new FormControl());
          this.Mrp[index].setValue(e.mrp);
          this.dataSource.data[index].mrp = e.mrp;

          this.BatchNum.push(new FormControl());
          this.BatchNum[index].setValue(e.batchNumber);
          this.dataSource.data[index].batchNumber = e.batchNumber;

          this.PurchaseAmount.push(new FormControl());
          this.PurchaseAmount[index].setValue(e.purPrice);
          this.dataSource.data[index].purPrice = e.purPrice;

          this.Quantity.push(new FormControl());
          this.Quantity[index].setValue(e.quantity);
          this.dataSource.data[index].quantity = e.quantity;

          this.FreeQuantity.push(new FormControl());
          this.FreeQuantity[index].setValue(e.freeQuantity);
          this.dataSource.data[index].freeQuantity = e.freeQuantity;

          this.DiscountAmount.push(new FormControl());
          this.DiscountAmount[index].setValue(e.discount);
          this.dataSource.data[index].discount = e.discount;

          this.DiscountType.push(new FormControl());
          this.DiscountType[index].setValue(e.disType);
          this.dataSource.data[index].disType = e.disType;

          this.Amount.push(new FormControl());
          this.Amount[index].setValue(e.purPrice * e.quantity - e.disAmount);
          this.dataSource.data[index].disAmount = e.disAmount;

          this.shortName.push(new FormControl());
          this.shortName[index].setValue(e.shortName);
          this.dataSource.data[index].shortName = e.shortName;

          this.mDate.push(new FormControl());
          this.mDate[index].setValue(e.mfgDate);
          this.dataSource.data[index].mfgDate = e.mfgDate;

          this.date.push(new FormControl());
          this.date[index].setValue(e.expiryDate);
          this.dataSource.data[index].expiryDate = e.expiryDate;

          if (this.medicinesData.hsn.gst === '5') {
            this.gstValue5 += e.purPrice * e.quantity - e.disAmount;
            this.gstPrice5 += parseInt(e.gstValue.toString());
          }
          else if (this.medicinesData.hsn.gst === '12') {
            this.gstValue12 += e.purPrice * e.quantity - e.disAmount;
            this.gstPrice12 += parseInt(e.gstValue.toString());
          }
          else if (this.medicinesData.hsn.gst === '18') {
            this.gstValue18 += e.purPrice * e.quantity - e.disAmount;
            this.gstPrice18 += parseInt(e.gstValue.toString());
          }
          else if (this.medicinesData.hsn.gst === '28') {
            this.gstValue28 += e.purPrice * e.quantity - e.disAmount;
            this.gstPrice28 += parseInt(e.gstValue.toString());
          }
          else if (this.medicinesData.hsn.gst === '0') {
            this.gstValue0 += e.purPrice * e.quantity - e.disAmount;
            this.gstPrice0 += parseInt(e.gstValue.toString());
          }
        });
      });
    });

  }
  else {
    this.supplierName = '';
    let date = new Date().toISOString().toString().split('T')[0];
    this.purchaseForm = new FormGroup({
      purInvoiceNum: new FormControl(this.purchaseForm.value.purInvoiceNum, Validators.required),
      purchaseDate: new FormControl(date, Validators.required),
      description: new FormControl(this.purchaseForm.value.description),
      // userId: new FormControl(this.sId, Validators.required),
      amount: new FormControl(this.amount, Validators.required),
      billType: new FormControl(this.purchaseForm.value.billType),
      disType: new FormControl(this.purchaseForm.value.disType, Validators.required),
      discount: new FormControl(this.purchaseForm.value.discount, Validators.required),
      totalAmount: new FormControl(this.total, Validators.required),
      createdBy: new FormControl(this.createdBy, Validators.required),
    });
  }
}

purCalculations() {
  this.tDis = false;
  if (this.purchaseForm.value.disType === 'flat') {
    this.purDisAmount = this.purchaseForm.value.discount;
  }
  else if (this.purchaseForm.value.disType === 'percentage') {
    this.purDisAmount = this.total * this.purchaseForm.value.discount / 100;
  }
  this.netAmount = this.total - this.purDisAmount;
}

onSubmit() {
  this.totallength = this.dataSource.data.length;
  console.log(this.totallength);
  if(this.purchaseForm.valid === true){
  if (this.totallength > 0){
  let purchaseData = {
    userId: this.userId,
    purInvoiceNum: this.purchaseForm.value.purInvoiceNum,
    purchaseDate: this.purchaseForm.value.purchaseDate,
    billType: this.purchaseForm.value.billType,
    amount: this.purAmount,
    itemDisAmount: this.discountPrice,
    subTotal: this.amount,
    taxAmount: this.totalGstPrice,
    totalAmount: this.total,
    disType: this.purchaseForm.value.disType,
    discount: this.purchaseForm.value.discount,
    disAmount: this.purDisAmount,
    extraDisAmount: 0,
    netAmount: this.netAmount,
    paidAmount: 0,
    dueAmount: this.netAmount,
    description: this.purchaseForm.value.description,
    created: this.createdBy
  };
  let balanceSheetData = {
    userId: this.userId,
    credit: purchaseData.netAmount,
    debit : 0 ,
    balance: parseFloat(this.userBalance.toString()) + parseFloat(purchaseData.netAmount.toString()),
    invoiceNumbers: this.purchaseForm.value.purInvoiceNum,
    description: this.purchaseForm.value.description,
    paymentTypeId: 1,
    created: this.createdBy
  };
  this.purchaseService.addPurchase(purchaseData).subscribe(data => {
    this.purchaseData = data;
    if (data){
       this.balanceSheetService.addBalanceSheet(balanceSheetData).subscribe(data => {});
    }
    this.dataSource.data.map(e => {
      let actualCostPrice = parseInt(e.actualCostPrice.toString()) / (parseInt(e.quantity.toString()) + parseInt(e.freeQuantity.toString()));
      let unitPrice = actualCostPrice / e.units;
      let unitMrp = e.mrp / e.units;
      let batchData = {
        batchNumber: e.batchNumber,
        // name: e.name,
        // shortName: e.shortName,
        packing: e.packing,
        units: e.units,
        quantity: e.quantity,
        freeQuantity: e.freeQuantity,
        availableQuantity: parseInt(e.quantity.toString()) + parseInt(e.freeQuantity.toString()),
        availableUnits: parseInt(e.units.toString()) * (parseInt(e.quantity.toString()) + parseInt(e.freeQuantity.toString())),
        mfgDate: e.mfgDate,
        expiryDate: e.expiryDate,
        mrp: e.mrp,
        purPrice: e.purPrice,
        companyPTR: e.purPrice,
        disType: e.disType,
        discount: e.discount,
        disAmount: e.disAmount,
        gstValue: e.gstValue,
        actualCostPrice: actualCostPrice,
        unitPrice: unitPrice,
        unitMrp: unitMrp,
        margin: e.margin,
        totalAmount: e.actualCostPrice,
        created: this.createdBy,
        purchaseId: this.purchaseData.id,
        productId: e.productId,
        // hsnTypeId: 1
      };
      this.batchService.addBatch(batchData).subscribe(data => {
        if (data) {
          this.snackBar.open('Medicine Puchcased!', 'Success', {
            duration: 2000,
          });
          this.router.navigate(['/admin/PurchaseBatch']);
        }
      });
    });
  });
}
else{
  alert('No Data Found in Batch');
  return;
}
}
else {
  alert('Please fill all the Mandetory Fields');
  return;
}
}

calculations(index: any) {
  let amount = 0;
  let DiscountPrice = 0;
  let discountPrice = 0;
  let Amount = 0;
  let mbAmount = 0;
  let discount = 0;
  let gstValue5 = 0;
  let gstValue12 = 0;
  let gstValue18 = 0;
  let gstValue28 = 0;
  let gstValue0 = 0;
  let mbgstValue0 = 0;
  let mbgstValue5 = 0;
  let mbgstValue12 = 0;
  let mbgstValue18 = 0;
  let mbgstValue28 = 0;

  let discountType = this.dataSource.data[index].disType;
  let mrp = this.dataSource.data[index].mrp;
  let quantity = this.dataSource.data[index].quantity;
  let freeQuantity = this.dataSource.data[index].freeQuantity;

  let gst = this.dataSource.data[index].gst;
  console.log(gst);

  mbAmount = this.dataSource.data[index].purPrice * this.dataSource.data[index].quantity;

  if (discountType === 'flat') {
    discount = this.dataSource.data[index].discount;
  }
  else if (discountType === 'percentage') {
    discount = mbAmount * this.dataSource.data[index].discount / 100;
  }

  let gstValue = ((mbAmount - discount) * parseInt(gst)) / 100;
  this.dataSource.data[index]['disAmount'] = discount;
  this.dataSource.data[index]['gstValue'] = gstValue;
  this.dataSource.data[index]['actualCostPrice'] = (mbAmount - parseInt(discount.toString()) + gstValue);

  let totalQunatity = parseInt(quantity.toString()) + parseInt(freeQuantity.toString());
  let actualCostPrice = (mbAmount - parseInt(discount.toString()) + gstValue);
  let margin = ((mrp - (actualCostPrice / totalQunatity)) / mrp) * 100;


  this.dataSource.data[index]['margin'] = margin;

  if (gst === '5') {
    mbgstValue5 = mbAmount - discount;
    this.dataSource.data[index]['gstValue5'] = mbgstValue5;
  }
  else if (gst === '12') {
    mbgstValue12 = mbAmount - discount;
    this.dataSource.data[index]['gstValue12'] = mbgstValue12;
  }
  else if (gst === '18') {
    mbgstValue18 = mbAmount - discount;
    this.dataSource.data[index]['gstValue18'] = mbgstValue18;
  }
  else if (gst === '28') {
    mbgstValue28 = mbAmount - discount;
    this.dataSource.data[index]['gstValue28'] = mbgstValue28;
  }
  else if (gst === '0') {
    mbgstValue0 = mbAmount - discount;
    this.dataSource.data[index]['gstValue0'] = mbgstValue0;
  }

  this.dataSource.data.forEach((element, i) => {
    amount = element.purPrice * element.quantity;

    if (element.disType === 'flat') {
      discountPrice += parseInt(element.discount.toString());
    }
    else if (element.disType === 'percentage') {
      discountPrice += amount * element.discount / 100;
    }

    if (element.gst === '5') {
      gstValue5 += element.gstValue5;
    }
    else if (element.gst === '12') {
      gstValue12 += element.gstValue12;
    }
    else if (element.gst === '18') {
      gstValue18 += element.gstValue18;
    }
    else if (element.gst === '28') {
      gstValue28 += element.gstValue28;
    }
    else if (element.gst === '0') {
      gstValue0 += element.gstValue0;
    }

    Amount += amount;
    // DiscountPrice += discountPrice
  });
  this.purAmount = Amount;
  this.amount = Amount - discountPrice;
  this.discountPrice = discountPrice;
  this.gstValue0 = gstValue0;
  this.gstValue5 = gstValue5;
  this.gstValue12 = gstValue12;
  this.gstValue18 = gstValue18;
  this.gstValue28 = gstValue28;
  this.gstPrice5 = (this.gstValue5 * 5) / 100;
  this.gstPrice12 = (this.gstValue12 * 12) / 100;
  this.gstPrice18 = (this.gstValue18 * 18) / 100;
  this.gstPrice28 = (this.gstValue28 * 28) / 100;
  this.totalGstPrice = this.gstPrice5 + this.gstPrice12 + this.gstPrice18 + this.gstPrice28;
  this.total = this.amount + this.totalGstPrice;
  this.netAmount = this.total;
  this.Amount.push(new FormControl());
  this.Amount[index].setValue(mbAmount - discount);

  this.MarginValue.push(new FormControl());
  this.MarginValue[index].setValue(margin);
  this.intForm();
}

medicineFilter(event: any) {
  this.medicinesData.filter = event.target.value.trim().toLowerCase();
  this.medicines = this.medicinesData.filteredData;
}
medicibeId(id: number, index: number) {
  this.dataSource.data[index]['productId'] = id;
  this.medicineService.getMedicinesById(id).subscribe(data => {
    this.medicinesData = data;
    this.hsn.push(new FormControl());
    this.hsn[index].setValue(this.medicinesData.hsn.code);
    this.dataSource.data[index].hsn = this.medicinesData.hsn.code;
    this.gst.push(new FormControl());
    this.gst[index].setValue(this.medicinesData.hsn.gst);
    this.dataSource.data[index].gst = this.medicinesData.hsn.gst;
    this.packing.push(new FormControl());
    this.packing[index].setValue(this.medicinesData.packing);
    this.dataSource.data[index].packing = this.medicinesData.packing;
    this.units.push(new FormControl());
    this.units[index].setValue(this.medicinesData.units);
    this.dataSource.data[index].units = this.medicinesData.units;
    this.shortName.push(new FormControl());
    this.shortName[index].setValue(this.medicinesData.shortName);
    this.dataSource.data[index].shortName = this.medicinesData.shortName;
  });
  this.calculations(index);
}
supplierFilter(event: any) {
  this.suppliersData.filter = event.target.value.trim().toLowerCase();
  this.suppliers = this.suppliersData.filteredData;
}
supplierId(id: number) {
  this.sId = id;
  this.suppliersService.getSuppliersById(this.sId).subscribe(data => {
    this.suppliersData = data;
    this.supplierAddress1 = this.suppliersData.address + ',';
    this.supplierAddress2 = this.suppliersData.city + ',';
    this.supplierAddress3 = this.suppliersData.pin + '.';
    this.userId = this.suppliersData.user.id;
    this.balanceSheetService.getBalanceSheetByUserId(this.userId).subscribe(data => {
      this.balanceSheetData = data as BalanceSheetModel[];
      this.userBalance = 0;
      this.userBalance = this.balanceSheetData[0].balance;
    });
  });
}



addItem(event: any, fieldName: any, index: any) {
  let value;
  if (typeof event === 'string') {
    value = event;
  } else if (event['option']) {
    value = event.option.value;
  } else {
    value = event.target.value;
  }
  this.dataSource.data[index][fieldName] = value;
}

createNewUser(): any {
  let data = {
    name: '',
    batchNumber: '',
    expiryDate: '',
    quantity: '',
    purPrice: '',
    // mbSalePrice: '',
    disType: 'percentage',
    discount: 0,
    actualCostPrice: '',
    packing: '',
    mfgDate: '',
    freeQuantity: 0,
    gstValue: 0,
    gst: '',
    hsn: '',
    // disAmount: '',
    gstValue5: 0,
    gstValue12: 0,
    gstValue18: 0,
    gstValue28: 0,
    gstValue0: 0,
    createdBy: 0,
    product: {},
    // mbCreatedAt: '',
    status: true,
    // pId: 0
  };
  return data;

}
addRow() {
  this.dataSource.data.push(this.createNewUser());
  this.dataSource.filter = '';
}
// deleteRow(index: any) {
//   this.calculations(index);
//   this.dataSource.data = this.dataSource.data.filter((value: any, key: any) => {
//     return key != index;
//   });
// }
deleteRow(id: any, index: any) {
  console.log(this.dataSource.data);
  this.dataSource.data = this.dataSource.data.filter((value: any, key: any) => {
    return value.id != id;
  });
  console.log(this.dataSource.data);
  this.calculations(index);
}

chosenYearHandler(normalizedYear: Moment, index: number) {
  this.date.push(new FormControl(moment()));
  const ctrlValue = this.date[index].value;
  ctrlValue.year(normalizedYear.year());
  this.date[index].setValue(ctrlValue);
}

chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: any) {
  const ctrlValue = this.date[index].value;
  ctrlValue.month(normalizedMonth.month());
  this.date[index].setValue(ctrlValue);
  this.dataSource.data[index].expiryDate = ctrlValue;
  datepicker.close();
  let date = (new Date(this.date[index].value).getMonth() + 1).toString() + '-' + (new Date(this.date[index].value).getFullYear().toString());
  this.addItem(ctrlValue, 'expiryDate', index);
}


mfgChosenYearHandler(MnormalizedYear: Moment, index: number) {
  this.mDate.push(new FormControl(moment()));
  const ctrlValue = this.mDate[index].value;
  ctrlValue.year(MnormalizedYear.year());
  this.mDate[index].setValue(ctrlValue);
}

mfgChosenMonthHandler(MnormalizedYear: Moment, Datepicker: MatDatepicker<Moment>, index: any) {
  const ctrlValue = this.mDate[index].value;
  ctrlValue.month(MnormalizedYear.month());
  this.mDate[index].setValue(ctrlValue);
  // this.dataSource.data[index]['mfgDate'] = ctrlValue
  this.dataSource.data[index].mfgDate = ctrlValue;

  Datepicker.close();
  let mfgDate = (new Date(this.mDate[index].value).getMonth() + 1).toString() + '-' + (new Date(this.mDate[index].value).getFullYear().toString());
  this.addItem(ctrlValue, 'mfgDate', index);
  // this.dataSource.data[index]['mfgDate'] = this.mDate[index].value
}
}
