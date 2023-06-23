import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
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
import { SalesDemoComponent } from '../sales-demo/sales-demo.component';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.scss'],
})
export class PurchaseReturnComponent implements OnInit {
  buttons = true;
  sId: number;
  userId: number;
  createdBy: number;
  id: number;
  minDate: Date;
  maxDate: Date;
  mfgMinDate: Date;
  mfgMaxDate: Date;
  totalAmount: number;
  BatchData2: any;
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

  gstValue0 = 0;
  gstValue5 = 0;
  gstValue12 = 0;
  gstValue18 = 0;
  gstValue28 = 0;
  bId: number;

  discountPrice = 0;
  amount = 0;
  purAmount = 0;
  purDisAmount = 0;
  netAmount = 0;
  total = 0.0;
  Amount = [];
  Units: number;
  MarginValue = [];
  date = [];
  mDate = [];
  gst = [];
  packing = [];
  units = [];
  shortName = [];
  productName = [];
  Mrp = [];
  Data = [];
  BatchNum = [];
  PurchaseAmount = [];
  Quantity = [];
  FreeQuantity = [];
  DiscountAmount = [];
  DiscountType = [];
  hsn = [];
  Quantityy = [];
  company = [];
  BatchData: any;
  data1 = [];
  div: boolean;
  batchData3: any;
  batchDetails: any;
  batchData1: any;
  totallength: number;
  selectedRowIndex: any;
  data: any;
  totalLength = [3, 5, 10, 25, 50, 100];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  simpleDialog: MatDialogRef<SalesDemoComponent>;

  purchaseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    purInvoiceNum: new FormControl('', Validators.required),
    purchaseDate: new FormControl('', Validators.required),
    description: new FormControl(''),
    // userId: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    billType: new FormControl('', Validators.required),
    disType: new FormControl('percentage', Validators.required),
    discount: new FormControl(0, Validators.required),
    totalAmount: new FormControl('', Validators.required),
    created: new FormControl('', Validators.required),
  });

  displayedColumns: string[] = [
    'name',
    'batch',
    'packing',
    'units',
    'mrp',
    'purchasePrice',
   
    // 'freeQuantity',
    'mfgDate',
    'expiry',
    'qty',
    'discount',
    'gst',
    'price',
    // 'code',
    // 'actions',
  ];
  displayedColumns2: string[] = [
    'id',
    'productId',
    'shortName',
    'batchNumber',
    'company',
    'unitPacking',
    'mfgDate',
    'expiryDate',
    'unitMrp',
    'purchasePrice',
    'quantity',
    'freeQuantity',
    'availableUnits',
    'gst',
  ];

  constructor(
    private purchaseService: PurchaseService,
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
  }
  @HostListener('window:keydown', ['$event']) spaceEvent(event: any) {
    if (event.keyCode === 13) {
      // enter key
      this.simpleDialog.close({ data: this.data });
    }
    else if (event.keyCode === 38) {
      // up arrow
      this.arrowUpEvent();
    } else if (event.keyCode === 40) {
      // down arrow
      this.arrowDownEvent();
    }
     else if (event.keyCode === 32) {
      // space
      this.openDialog();
    }
    //  else if (event.keyCode === 37) {
    //   // left arrow
    // } else if (event.keyCode === 39) {
    //   // right arrow
    // } else if (event.keyCode === 27) {
    //   // the ESC key
    // }
    // else if (event.keyCode === 16) {
    //   // the Shift key
    // }
    // else if (event.keyCode === 9) {
    //   // the Tab key
    // }
    // else if (event.keyCode === 8) {
    //   // the BackSpace key
    // }
  }
  ngOnInit(): void {
    const users: any = [];
    this.BatchData = new MatTableDataSource(users);
    // this.BatchData.data.push(this.createNewUser());

    this.mDate.push(new FormControl());
    this.MarginValue.push(new FormControl());
    this.productName.push(new FormControl());
    this.date.push(new FormControl());
    this.Amount.push(new FormControl());
    this.hsn.push(new FormControl());
    this.gst.push(new FormControl());
    this.shortName.push(new FormControl());
    this.packing.push(new FormControl());
    this.units.push(new FormControl());
    this.Mrp.push(new FormControl());
    this.BatchNum.push(new FormControl());
    this.PurchaseAmount.push(new FormControl());
    this.Quantity.push(new FormControl());
    this.FreeQuantity.push(new FormControl());
    this.DiscountAmount.push(new FormControl());
    this.DiscountType.push(new FormControl());

    this.ReadBatchDetails();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 0, currentMonth + 3);
    this.maxDate = new Date(currentYear + 3, currentMonth);
    this.mfgMinDate = new Date(currentYear - 25, currentMonth);
    this.mfgMaxDate = new Date(currentYear + 0, currentMonth);

    this.createdBy = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.medicineService.getMedicines().subscribe((data) => {
      this.medicines = data;
      this.medicinesData = data;
      this.medicinesData = new MatTableDataSource(this.medicinesData);
    });
    this.suppliersService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
      this.suppliersData = data;
      this.suppliersData = new MatTableDataSource(this.suppliersData);
    });
    this.intForm();
    this.div = false;
  }
  ReadBatchDetails() {
    this.batchService.getBatch().subscribe((data) => {
      this.batchData1 = data;
      this.batchData1 = new MatTableDataSource(this.batchData1);
    });
  }

  // openDialog(index: number) {
  //   this.simpleDialog = this.dialog.open(SalesDemoComponent, {
  //     width: '80%'
  //   });
  //   this.simpleDialog.afterClosed().subscribe(res => {
  //     console.log(res.data);
  //     this.medicinesData = res.data;

  //     console.log(this.medicinesData.id);
  //     this.packing.push(new FormControl());
  //     this.packing[index].setValue(res.data.packing);
  //     this.BatchData.data[index].packing = res.data.packing;

  //     this.units.push(new FormControl());
  //     this.units[index].setValue(res.data.units);
  //     this.BatchData.data[index].units = res.data.units;

  //     this.productName.push(new FormControl());
  //     this.productName[index].setValue(res.data.name);
  //     this.BatchData.data[index].name = res.data.name;

  //     this.gst.push(new FormControl());
  //     this.gst[index].setValue(this.medicinesData.hsn.gst);
  //     this.BatchData.data[index].gst = this.medicinesData.hsn.gst;

  //     this.hsn.push(new FormControl());
  //     this.hsn[index].setValue(this.medicinesData.hsn.code);
  //     this.BatchData.data[index].hsn = this.medicinesData.hsn.code;

  //     this.MarginValue.push(new FormControl());
  //     this.MarginValue[index].setValue(res.data.margin);
  //     this.BatchData.data[index].margin = res.data.margin;

  //     this.Mrp.push(new FormControl());
  //     this.Mrp[index].setValue(res.data.mrp);
  //     this.BatchData.data[index].mrp = res.data.mrp;

  //     this.BatchNum.push(new FormControl());
  //     this.BatchNum[index].setValue(res.data.batchNumber);
  //     this.BatchData.data[index].batchNumber = res.data.batchNumber;

  //     this.shortName.push(new FormControl());
  //     this.shortName[index].setValue(res.data.shortName);
  //     this.BatchData.data[index].shortName = res.data.shortName;

  //     this.mDate.push(new FormControl());
  //     this.mDate[index].setValue(res.data.mfgDate);
  //     this.BatchData.data[index].mfgDate = res.data.mfgDate;

  //     this.date.push(new FormControl());
  //     this.date[index].setValue(res.data.expiryDate);
  //     this.BatchData.data[index].expiryDate = res.data.expiryDate;

  //     this.BatchData.data[index].productId = res.data.id;

  //     this.batchService.getBatchByProductId(this.medicinesData.id).subscribe(data => {
  //       this.batchData3 = data;
  //       console.log(this.batchData3);
  //       this.batchData3 = new MatTableDataSource(this.batchData3);
  //     });
  //     this.Data.push(this.medicinesData);
  //     this.BatchData2 = this.Data;
  //     this.BatchData = new MatTableDataSource(this.data1);
  //     this.totallength = this.BatchData.data.length;
  //   });
  //     this.div = true;
  // }
  openDialog() {
    this.simpleDialog = this.dialog.open(SalesDemoComponent, {
      width: '80%',
    });
    this.simpleDialog.afterClosed().subscribe((res) => {
      console.log(res.data);
      this.batchData1 = res.data;
      const data = {
        id: this.batchData1.id,
        name: this.batchData1.name,
        gst: this.batchData1.hsn.gst,
        hsn: this.batchData1.hsn.code,
        shortName: this.batchData1.shortName,
        packing: this.batchData1.packing,
        units: this.batchData1.units,
        company: this.batchData1.company.company,
        category: this.batchData1.category.category,
        batchNumber: this.batchData1.batchNumber,
        mrp: this.batchData1.mrp,

        batchId: '',
        Quantity: '',
        itemDisAmount: '',
        subTotal: '',
        disType: '',
        disAmount: '',
        discount: '',
        afterDisAmount: '',
        taxAmount: '',
        netAmount: '',
        description: '',
        totalAmount: '',
        status: true,
        created: this.createdBy,
        availableUnits: '',
      };
      this.batchService
        .getBatchByProductId(this.batchData1.id)
        .subscribe((data) => {
          this.batchData3 = data;
          this.batchData3 = new MatTableDataSource(this.batchData3);
          this.batchData3.paginator = this.paginator;
          this.batchData3.sort = this.sort;
          this.total = this.batchData3.data.length;
          this.highlight(this.batchData3.filteredData[0]);
        });
      this.Data.push(data);
      this.BatchData2 = this.Data;
      this.BatchData = new MatTableDataSource(this.data1);
      this.totallength = this.BatchData.data.length;
    });
    this.div = true;
  }

  onClick(row: any, i) {
    let added = false;
    if (!this.BatchData.data[0]) {
      this.data1.push(row);
      console.log(this.data1);
      this.BatchData = new MatTableDataSource(this.data1);
      this.BatchData.data.map((e, index) => {
        console.log(e.batchNumber, index);
        this.BatchData.data[index].id = e.id;

        this.productName.push(new FormControl());
        this.productName[index].setValue(e.product.name);
        this.BatchData.data[index].name = e.product.name;

        this.packing.push(new FormControl());
        this.packing[index].setValue(e.product.packing);
        this.BatchData.data[index].packing = e.product.packing;

        this.units.push(new FormControl());
        this.units[index].setValue(e.product.units);
        this.BatchData.data[index].units = e.product.units;

       

        // this.hsn.push(new FormControl());
        // this.hsn[index].setValue(e.product.hsn.code);
        // this.BatchData.data[index].hsn = e.product.hsn.code;

        this.BatchNum.push(new FormControl());
        this.BatchNum[index].setValue(e.batchNumber);
        this.BatchData.data[index].batchNumber = e.batchNumber;

        this.date.push(new FormControl());
        this.date[index].setValue(e.expiryDate);
        this.BatchData.data[index].expiryDate = e.expiryDate;

        this.Mrp.push(new FormControl());
        this.Mrp[index].setValue(e.mrp);
        this.BatchData.data[index].mrp = e.mrp;

        this.mDate.push(new FormControl());
        this.mDate[index].setValue(e.mfgDate);
        this.BatchData.data[index].mfgDate = e.mfgDate;

        this.gst.push(new FormControl());
        this.gst[index].setValue(e.product.hsn.gst);
        this.BatchData.data[index].gst = e.product.hsn.gst;

        // this.MarginValue.push(new FormControl());
        // this.MarginValue[index].setValue(e.margin);
        // this.dataSource.data[index].margin = e.margin;

        // this.PurchaseAmount.push(new FormControl());
        // this.PurchaseAmount[index].setValue(e.purPrice);
        // this.dataSource.data[index].purPrice = e.purPrice;
      });
    } else{
      added = false;
      this.BatchData.data.map((e, index) => {
        this.BatchData.data[index].id = e.id;
        const Quantity = this.BatchData.data[index].quantity;
        if (e.product.name === row.product.name && e.batchNumber === row.batchNumber) {
          added = true;
          alert('Product Already Exist');
        }
      });
      if (!added) {
        this.data1.push(row);
        console.log(this.data1);
        this.BatchData = new MatTableDataSource(this.data1);
        console.log(this.BatchData);

        this.BatchData.data.map((e, index) => {
          console.log(e, index);

          this.BatchData.data[index].id = e.id;

          this.productName.push(new FormControl());
          this.productName[index].setValue(e.product.name);
          this.BatchData.data[index].name = e.product.name;

          this.packing.push(new FormControl());
          this.packing[index].setValue(e.product.packing);
          this.BatchData.data[index].packing = e.product.packing;

          this.units.push(new FormControl());
          this.units[index].setValue(e.product.units);
          this.BatchData.data[index].units = e.product.units;

          this.BatchNum.push(new FormControl());
          this.BatchNum[index].setValue(e.batchNumber);
          this.BatchData.data[index].batchNumber = e.batchNumber;

          this.Mrp.push(new FormControl());
          this.Mrp[index].setValue(e.mrp);
          this.BatchData.data[index].mrp = e.mrp;
         

          this.date.push(new FormControl());
          this.date[index].setValue(e.expiryDate);
          this.BatchData.data[index].expiryDate = e.expiryDate;

         
          this.mDate.push(new FormControl());
          this.mDate[index].setValue(e.mfgDate);
          this.BatchData.data[index].mfgDate = e.mfgDate;

          this.gst.push(new FormControl());
          this.gst[index].setValue(e.product.hsn.gst);
          this.BatchData.data[index].gst = e.product.hsn.gst;

          // this.hsn.push(new FormControl());
          // this.hsn[index].setValue(e.product.hsn.code);
          // this.BatchData.data[index].hsn = e.product.hsn.code;
          // this.PurchaseAmount.push(new FormControl());
          // this.PurchaseAmount[index].setValue(e.purPrice);
          // this.BatchData.data[index].purPrice = e.purPrice;
        });
      }
    }
  }

  intForm() {
    if (this.id) {
      this.buttons = false;
      this.tDis = true;
      this.purchaseService.getPurchaseById(this.id).subscribe((data) => {
        this.purchaseData = data;
        this.suppliersService
          .getSuppliersByUserId(this.purchaseData.user.id)
          .subscribe((data) => {
            this.suppliersData = data;
            this.suppliersData.map((e) => {
              this.supplierName = e.shortName;
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
        const date = this.purchaseData.purchaseDate;
        this.purchaseForm = new FormGroup({
          purInvoiceNum: new FormControl(
            this.purchaseData.purInvoiceNum,
            Validators.required
          ),
          purchaseDate: new FormControl(
            date.toString().split('T')[0],
            Validators.required
          ),
          description: new FormControl(this.purchaseData.description),
          billType: new FormControl(
            this.purchaseData.billType,
            Validators.required
          ),
          disType: new FormControl(
            this.purchaseData.disType,
            Validators.required
          ),
          discount: new FormControl(
            this.purchaseForm.value.discount,
            Validators.required
          ),
        });
        this.batchService.getBatchByPurchaseId(this.id).subscribe((data) => {
          this.batchData = data;
          this.BatchData = new MatTableDataSource(this.batchData);
          this.BatchData.data.map((e, index) => {
            this.medicinesData = e.product;
            this.gst.push(new FormControl());
            this.gst[index].setValue(this.medicinesData.hsn.gst);
            this.BatchData.data[index].gst = this.medicinesData.hsn.gst;

            this.hsn.push(new FormControl());
            this.hsn[index].setValue(this.medicinesData.hsn.code);
            this.BatchData.data[index].hsn = this.medicinesData.hsn.code;

            this.productName.push(new FormControl());
            this.productName[index].setValue(e.product.name);
            this.BatchData.data[index].name = e.product.name;

            this.packing.push(new FormControl());
            this.packing[index].setValue(e.product.packing);
            this.BatchData.data[index].packing = e.product.packing;

            this.units.push(new FormControl());
            this.units[index].setValue(e.product.units);
            this.BatchData.data[index].units = e.product.units;

            // this.MarginValue.push(new FormControl());
            // this.MarginValue[index].setValue(e.margin);
            // this.dataSource.data[index].margin = e.margin;

            this.Mrp.push(new FormControl());
            this.Mrp[index].setValue(e.mrp);
            this.BatchData.data[index].mrp = e.mrp;

            this.BatchNum.push(new FormControl());
            this.BatchNum[index].setValue(e.batchNumber);
            this.BatchData.data[index].batchNumber = e.batchNumber;

            this.PurchaseAmount.push(new FormControl());
            this.PurchaseAmount[index].setValue(e.purPrice);
            this.BatchData.data[index].purPrice = e.purPrice;

            this.Quantity.push(new FormControl());
            this.Quantity[index].setValue(e.quantity);
            this.BatchData.data[index].quantity = e.quantity;

            this.FreeQuantity.push(new FormControl());
            this.FreeQuantity[index].setValue(e.freeQuantity);
            this.BatchData.data[index].freeQuantity = e.freeQuantity;

            this.DiscountAmount.push(new FormControl());
            this.DiscountAmount[index].setValue(e.discount);
            this.BatchData.data[index].discount = e.discount;

            this.DiscountType.push(new FormControl());
            this.DiscountType[index].setValue(e.disType);
            this.BatchData.data[index].disType = e.disType;

            this.Amount.push(new FormControl());
            this.Amount[index].setValue(e.purPrice * e.quantity - e.disAmount);
            this.BatchData.data[index].disAmount = e.disAmount;

            this.shortName.push(new FormControl());
            this.shortName[index].setValue(e.shortName);
            this.BatchData.data[index].shortName = e.shortName;

            this.mDate.push(new FormControl());
            this.mDate[index].setValue(e.mfgDate);
            this.BatchData.data[index].mfgDate = e.mfgDate;

            this.date.push(new FormControl());
            this.date[index].setValue(e.expiryDate);
            this.BatchData.data[index].expiryDate = e.expiryDate;

            if (this.medicinesData.hsn.gst === '5') {
              this.gstValue5 += e.purPrice * e.quantity - e.disAmount;
              this.gstPrice5 += parseInt(e.gstValue.toString());
            } else if (this.medicinesData.hsn.gst === '12') {
              this.gstValue12 += e.purPrice * e.quantity - e.disAmount;
              this.gstPrice12 += parseInt(e.gstValue.toString());
            } else if (this.medicinesData.hsn.gst === '18') {
              this.gstValue18 += e.purPrice * e.quantity - e.disAmount;
              this.gstPrice18 += parseInt(e.gstValue.toString());
            } else if (this.medicinesData.hsn.gst === '28') {
              this.gstValue28 += e.purPrice * e.quantity - e.disAmount;
              this.gstPrice28 += parseInt(e.gstValue.toString());
            } else if (this.medicinesData.hsn.gst === '0') {
              this.gstValue0 += e.purPrice * e.quantity - e.disAmount;
              this.gstPrice0 += parseInt(e.gstValue.toString());
            }
          });
        });
      });
    } else {
      this.supplierName = '';
      const date = new Date().toISOString().toString().split('T')[0];
      this.purchaseForm = new FormGroup({
        purInvoiceNum: new FormControl(
          this.purchaseForm.value.purInvoiceNum,
          Validators.required
        ),
        purchaseDate: new FormControl(date, Validators.required),
        description: new FormControl(
          this.purchaseForm.value.description,
          Validators.required
        ),
        // userId: new FormControl(this.sId, Validators.required),
        amount: new FormControl(this.amount, Validators.required),
        billType: new FormControl(
          this.purchaseForm.value.billType,
          Validators.required
        ),
        disType: new FormControl(
          this.purchaseForm.value.disType,
          Validators.required
        ),
        discount: new FormControl(
          this.purchaseForm.value.discount,
          Validators.required
        ),
        totalAmount: new FormControl(this.total, Validators.required),
        createdBy: new FormControl(this.createdBy, Validators.required),
      });
    }
  }

  purCalculations() {
    this.tDis = false;
    if (this.purchaseForm.value.disType === 'flat') {
      this.purDisAmount = this.purchaseForm.value.discount;
    } else if (this.purchaseForm.value.disType === 'percentage') {
      this.purDisAmount = (this.total * this.purchaseForm.value.discount) / 100;
    }
    this.netAmount = this.total - this.purDisAmount;
  }
  highlight(row: any) {
    this.selectedRowIndex = 1;
    this.data = row;
  //   this.div= true;
  //   console.log(this.data);
    let added = false;
    if (!this.BatchData.data[0]) {
      this.data1.push(row);
      console.log(this.data1);
      this.BatchData = new MatTableDataSource(this.data1);
      this.BatchData.data.map((e, index) => {
        console.log(e.batchNumber, index);
        this.BatchData.data[index].id = e.id;

        this.productName.push(new FormControl());
        this.productName[index].setValue(e.product.name);
        this.BatchData.data[index].name = e.product.name;

        this.packing.push(new FormControl());
        this.packing[index].setValue(e.product.packing);
        this.BatchData.data[index].packing = e.product.packing;

        this.units.push(new FormControl());
        this.units[index].setValue(e.product.units);
        this.BatchData.data[index].units = e.product.units;

       

        // this.hsn.push(new FormControl());
        // this.hsn[index].setValue(e.product.hsn.code);
        // this.BatchData.data[index].hsn = e.product.hsn.code;

        this.BatchNum.push(new FormControl());
        this.BatchNum[index].setValue(e.batchNumber);
        this.BatchData.data[index].batchNumber = e.batchNumber;

        this.date.push(new FormControl());
        this.date[index].setValue(e.expiryDate);
        this.BatchData.data[index].expiryDate = e.expiryDate;

        this.Mrp.push(new FormControl());
        this.Mrp[index].setValue(e.mrp);
        this.BatchData.data[index].mrp = e.mrp;

        this.mDate.push(new FormControl());
        this.mDate[index].setValue(e.mfgDate);
        this.BatchData.data[index].mfgDate = e.mfgDate;

        this.gst.push(new FormControl());
        this.gst[index].setValue(e.product.hsn.gst);
        this.BatchData.data[index].gst = e.product.hsn.gst;

        // this.MarginValue.push(new FormControl());
        // this.MarginValue[index].setValue(e.margin);
        // this.dataSource.data[index].margin = e.margin;

        // this.PurchaseAmount.push(new FormControl());
        // this.PurchaseAmount[index].setValue(e.purPrice);
        // this.dataSource.data[index].purPrice = e.purPrice;
      });
    } else{
      added = false;
      this.BatchData.data.map((e, index) => {
        this.BatchData.data[index].id = e.id;
        const Quantity = this.BatchData.data[index].quantity;
        if (e.product.name === row.product.name && e.batchNumber === row.batchNumber) {
          added = true;
          alert('Product Already Exist');
        }
      });
      if (!added) {
        this.data1.push(row);
        console.log(this.data1);
        this.BatchData = new MatTableDataSource(this.data1);
        console.log(this.BatchData);

        this.BatchData.data.map((e, index) => {
          console.log(e, index);

          this.BatchData.data[index].id = e.id;

          this.productName.push(new FormControl());
          this.productName[index].setValue(e.product.name);
          this.BatchData.data[index].name = e.product.name;

          this.packing.push(new FormControl());
          this.packing[index].setValue(e.product.packing);
          this.BatchData.data[index].packing = e.product.packing;

          this.units.push(new FormControl());
          this.units[index].setValue(e.product.units);
          this.BatchData.data[index].units = e.product.units;

          this.BatchNum.push(new FormControl());
          this.BatchNum[index].setValue(e.batchNumber);
          this.BatchData.data[index].batchNumber = e.batchNumber;

          this.Mrp.push(new FormControl());
          this.Mrp[index].setValue(e.mrp);
          this.BatchData.data[index].mrp = e.mrp;
         

          this.date.push(new FormControl());
          this.date[index].setValue(e.expiryDate);
          this.BatchData.data[index].expiryDate = e.expiryDate;

         
          this.mDate.push(new FormControl());
          this.mDate[index].setValue(e.mfgDate);
          this.BatchData.data[index].mfgDate = e.mfgDate;

          this.gst.push(new FormControl());
          this.gst[index].setValue(e.product.hsn.gst);
          this.BatchData.data[index].gst = e.product.hsn.gst;

          // this.hsn.push(new FormControl());
          // this.hsn[index].setValue(e.product.hsn.code);
          // this.BatchData.data[index].hsn = e.product.hsn.code;
          // this.PurchaseAmount.push(new FormControl());
          // this.PurchaseAmount[index].setValue(e.purPrice);
          // this.BatchData.data[index].purPrice = e.purPrice;
        });
      }
    }
    
  }
 
  highlight1(row: any) {
    const i = this.selectedRowIndex + 1;
    if (this.batchData3.filteredData.length >= i && i >= 1){
      this.selectedRowIndex += 1;
      this.data = row;
    }
    else{
      this.selectedRowIndex = this.selectedRowIndex + 1;
    }
    let added = false;
    if (!this.BatchData.data[0]) {
      this.data1.push(row);
      console.log(this.data1);
      this.BatchData = new MatTableDataSource(this.data1);
      this.BatchData.data.map((e, index) => {
        console.log(e.batchNumber, index);
        this.BatchData.data[index].id = e.id;

        this.productName.push(new FormControl());
        this.productName[index].setValue(e.product.name);
        this.BatchData.data[index].name = e.product.name;

        this.packing.push(new FormControl());
        this.packing[index].setValue(e.product.packing);
        this.BatchData.data[index].packing = e.product.packing;

        this.units.push(new FormControl());
        this.units[index].setValue(e.product.units);
        this.BatchData.data[index].units = e.product.units;

       

        // this.hsn.push(new FormControl());
        // this.hsn[index].setValue(e.product.hsn.code);
        // this.BatchData.data[index].hsn = e.product.hsn.code;

        this.BatchNum.push(new FormControl());
        this.BatchNum[index].setValue(e.batchNumber);
        this.BatchData.data[index].batchNumber = e.batchNumber;

        this.date.push(new FormControl());
        this.date[index].setValue(e.expiryDate);
        this.BatchData.data[index].expiryDate = e.expiryDate;

        this.Mrp.push(new FormControl());
        this.Mrp[index].setValue(e.mrp);
        this.BatchData.data[index].mrp = e.mrp;

        this.mDate.push(new FormControl());
        this.mDate[index].setValue(e.mfgDate);
        this.BatchData.data[index].mfgDate = e.mfgDate;

        this.gst.push(new FormControl());
        this.gst[index].setValue(e.product.hsn.gst);
        this.BatchData.data[index].gst = e.product.hsn.gst;

        // this.MarginValue.push(new FormControl());
        // this.MarginValue[index].setValue(e.margin);
        // this.dataSource.data[index].margin = e.margin;

        // this.PurchaseAmount.push(new FormControl());
        // this.PurchaseAmount[index].setValue(e.purPrice);
        // this.dataSource.data[index].purPrice = e.purPrice;
      });
    } else{
      added = false;
      console.log(row);
      
      this.BatchData.data.map((e, index) => {
        console.log(e);
        
        this.BatchData.data[index].id = e.id;
        const Quantity = this.BatchData.data[index].quantity;
        if (e.product.name === row.product.name && e.batchNumber === row.batchNumber) {
          added = true;
          alert('Product Already Exist');
        }
      });
      if (!added) {
        this.data1.push(row);
        console.log(this.data1);
        this.BatchData = new MatTableDataSource(this.data1);
        console.log(this.BatchData);

        this.BatchData.data.map((e, index) => {
          console.log(e, index);

          this.BatchData.data[index].id = e.id;

          this.productName.push(new FormControl());
          this.productName[index].setValue(e.product.name);
          this.BatchData.data[index].name = e.product.name;

          this.packing.push(new FormControl());
          this.packing[index].setValue(e.product.packing);
          this.BatchData.data[index].packing = e.product.packing;

          this.units.push(new FormControl());
          this.units[index].setValue(e.product.units);
          this.BatchData.data[index].units = e.product.units;

          this.BatchNum.push(new FormControl());
          this.BatchNum[index].setValue(e.batchNumber);
          this.BatchData.data[index].batchNumber = e.batchNumber;

          this.Mrp.push(new FormControl());
          this.Mrp[index].setValue(e.mrp);
          this.BatchData.data[index].mrp = e.mrp;
         

          this.date.push(new FormControl());
          this.date[index].setValue(e.expiryDate);
          this.BatchData.data[index].expiryDate = e.expiryDate;

         
          this.mDate.push(new FormControl());
          this.mDate[index].setValue(e.mfgDate);
          this.BatchData.data[index].mfgDate = e.mfgDate;

          this.gst.push(new FormControl());
          this.gst[index].setValue(e.product.hsn.gst);
          this.BatchData.data[index].gst = e.product.hsn.gst;

          // this.hsn.push(new FormControl());
          // this.hsn[index].setValue(e.product.hsn.code);
          // this.BatchData.data[index].hsn = e.product.hsn.code;
          // this.PurchaseAmount.push(new FormControl());
          // this.PurchaseAmount[index].setValue(e.purPrice);
          // this.BatchData.data[index].purPrice = e.purPrice;
        });
      }
    }
  }

  highlight2(row: any) {
    const i = this.selectedRowIndex + 1;
    if (this.batchData3.filteredData.length >= i && i >= 1){
    this.selectedRowIndex -= 1;
    this.data = row;
    }
    else{
      this.selectedRowIndex = this.selectedRowIndex - 1;
    }
    let added = false;
    if (!this.BatchData.data[0]) {
      this.data1.push(row);
      console.log(this.data1);
      this.BatchData = new MatTableDataSource(this.data1);
      this.BatchData.data.map((e, index) => {
        console.log(e.batchNumber, index);
        this.BatchData.data[index].id = e.id;

        this.productName.push(new FormControl());
        this.productName[index].setValue(e.product.name);
        this.BatchData.data[index].name = e.product.name;

        this.packing.push(new FormControl());
        this.packing[index].setValue(e.product.packing);
        this.BatchData.data[index].packing = e.product.packing;

        this.units.push(new FormControl());
        this.units[index].setValue(e.product.units);
        this.BatchData.data[index].units = e.product.units;

       

        // this.hsn.push(new FormControl());
        // this.hsn[index].setValue(e.product.hsn.code);
        // this.BatchData.data[index].hsn = e.product.hsn.code;

        this.BatchNum.push(new FormControl());
        this.BatchNum[index].setValue(e.batchNumber);
        this.BatchData.data[index].batchNumber = e.batchNumber;

        this.date.push(new FormControl());
        this.date[index].setValue(e.expiryDate);
        this.BatchData.data[index].expiryDate = e.expiryDate;

        this.Mrp.push(new FormControl());
        this.Mrp[index].setValue(e.mrp);
        this.BatchData.data[index].mrp = e.mrp;

        this.mDate.push(new FormControl());
        this.mDate[index].setValue(e.mfgDate);
        this.BatchData.data[index].mfgDate = e.mfgDate;

        this.gst.push(new FormControl());
        this.gst[index].setValue(e.product.hsn.gst);
        this.BatchData.data[index].gst = e.product.hsn.gst;

        // this.MarginValue.push(new FormControl());
        // this.MarginValue[index].setValue(e.margin);
        // this.dataSource.data[index].margin = e.margin;

        // this.PurchaseAmount.push(new FormControl());
        // this.PurchaseAmount[index].setValue(e.purPrice);
        // this.dataSource.data[index].purPrice = e.purPrice;
      });
    } else{
      added = false;
      this.BatchData.data.map((e, index) => {
        this.BatchData.data[index].id = e.id;
        const Quantity = this.BatchData.data[index].quantity;
        if (e.product.name === row.product.name && e.batchNumber === row.batchNumber) {
          added = true;
          alert('Product Already Exist');
        }
      });
      if (!added) {
        this.data1.push(row);
        console.log(this.data1);
        this.BatchData = new MatTableDataSource(this.data1);
        console.log(this.BatchData);

        this.BatchData.data.map((e, index) => {
          console.log(e, index);

          this.BatchData.data[index].id = e.id;

          this.productName.push(new FormControl());
          this.productName[index].setValue(e.product.name);
          this.BatchData.data[index].name = e.product.name;

          this.packing.push(new FormControl());
          this.packing[index].setValue(e.product.packing);
          this.BatchData.data[index].packing = e.product.packing;

          this.units.push(new FormControl());
          this.units[index].setValue(e.product.units);
          this.BatchData.data[index].units = e.product.units;

          this.BatchNum.push(new FormControl());
          this.BatchNum[index].setValue(e.batchNumber);
          this.BatchData.data[index].batchNumber = e.batchNumber;

          this.Mrp.push(new FormControl());
          this.Mrp[index].setValue(e.mrp);
          this.BatchData.data[index].mrp = e.mrp;
         

          this.date.push(new FormControl());
          this.date[index].setValue(e.expiryDate);
          this.BatchData.data[index].expiryDate = e.expiryDate;

         
          this.mDate.push(new FormControl());
          this.mDate[index].setValue(e.mfgDate);
          this.BatchData.data[index].mfgDate = e.mfgDate;

          this.gst.push(new FormControl());
          this.gst[index].setValue(e.product.hsn.gst);
          this.BatchData.data[index].gst = e.product.hsn.gst;

          // this.hsn.push(new FormControl());
          // this.hsn[index].setValue(e.product.hsn.code);
          // this.BatchData.data[index].hsn = e.product.hsn.code;
          // this.PurchaseAmount.push(new FormControl());
          // this.PurchaseAmount[index].setValue(e.purPrice);
          // this.BatchData.data[index].purPrice = e.purPrice;
        });
      }
    }
  }

  arrowUpEvent() {
    // this.div= true;
    let nextrow = this.batchData3.filteredData[this.selectedRowIndex - 2];
    this.highlight2(nextrow);
    this.data = nextrow;
    console.log(this.data);
  }

  arrowDownEvent() {
    // this.div= true;
    let nextrow = this.batchData3.filteredData[this.selectedRowIndex];
    this.highlight1(nextrow);
    this.data = nextrow;
    console.log(this.data);
  }

  onSubmit() {
    if (this.purchaseForm.valid === false){
      alert('Please fill all the mandetory Fields');
      return;
    }
    const purchaseData = {
      userId: this.userId,
      purInvoiceNum: this.purchaseForm.value.purInvoiceNum,
      purchaseDate: this.purchaseForm.value.purchaseDate,
      billType: 'Cash',
      amount: this.purAmount,
      itemDisAmount: this.discountPrice,
      subTotal: this.amount,
      taxAmount: this.totalGstPrice,
      totalAmount: this.total,
      disType: this.purchaseForm.value.disType,
      discount: this.purchaseForm.value.discount,
      disAmount: this.purDisAmount,
      netAmount: this.netAmount,
      paidAmount: 0,
      dueAmount: this.netAmount,
      description: this.purchaseForm.value.description,
      created: this.createdBy,
    };
    const balanceSheetData = {
      userId: this.userId,
      credit: 0,
      debit: purchaseData.netAmount,
      balance:
        parseFloat(this.userBalance.toString()) -
        parseFloat(purchaseData.netAmount.toString()),
      invoiceNumbers: this.purchaseForm.value.purInvoiceNum,
      description: this.purchaseForm.value.description,
      paymentTypeId: 1,
      created: this.createdBy,
    };

    this.purchaseService.addPurchaseReturn(purchaseData).subscribe((data) => {
      this.purchaseData = data;
      if (data) {
        this.balanceSheetService
          .addBalanceSheet(balanceSheetData)
          .subscribe((data) => {});
      }
      this.BatchData.data.map((e) => {
        console.log(e);
        
        // const actualCostPrice =
        //   parseInt(e.actualCostPrice.toString()) /
        //   (parseInt(e.quantity.toString()) +
        //     parseInt(e.freeQuantity.toString()));
        // const unitPrice = actualCostPrice / e.units;
        // const unitMrp = e.mrp / e.units;
        // const Quantity = e.quantity;
        // const freeQuantity = e.freeQuantity;
        this.Units = parseInt(e.units) * parseInt(e.quantity);
        console.log(e.units);
        console.log(e.availableUnits);

        let batchData = {
          availableUnits: e.availableUnits - this.Units,
          updatedAt: e.updatedAt,
        };
        console.log(batchData.availableUnits);
        let id =e.id;
        console.log(batchData);
        this.batchService.updateUnits(id, batchData).subscribe((data) => {
          if (data) {
            this.snackBar.open('Medicine Returned!', 'Success', {
              duration: 2000,
            });
            this.router.navigate(['/admin/purchase-return']);
          }
        });
      });
    });
  }

  calculations(index: any) {
    let amount = 0;
    const DiscountPrice = 0;
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

    const discountType = this.BatchData.data[index].disType;
    const mrp = this.BatchData.data[index].mrp;
    const quantity = this.BatchData.data[index].quantity;
    const freeQuantity = this.BatchData.data[index].freeQuantity;

    const gst = this.BatchData.data[index].gst;
    console.log(gst);

    mbAmount =
      this.BatchData.data[index].purPrice * this.BatchData.data[index].quantity;

    if (discountType === 'flat') {
      discount = this.BatchData.data[index].discount;
    } else if (discountType === 'percentage') {
      discount = (mbAmount * this.BatchData.data[index].discount) / 100;
    }

    const gstValue = ((mbAmount - discount) * parseInt(gst)) / 100;
    this.BatchData.data[index].disAmount = discount;
    this.BatchData.data[index].gstValue = gstValue;
    this.BatchData.data[index].actualCostPrice =
      mbAmount - parseInt(discount.toString()) + gstValue;

    const totalQunatity =
      parseInt(quantity.toString()) + parseInt(freeQuantity.toString());
    const actualCostPrice = mbAmount - parseInt(discount.toString()) + gstValue;
    const margin = ((mrp - actualCostPrice / totalQunatity) / mrp) * 100;

    this.BatchData.data[index].margin = margin;

    if (gst === '5') {
      mbgstValue5 = mbAmount - discount;
      this.BatchData.data[index].gstValue5 = mbgstValue5;
    } else if (gst === '12') {
      mbgstValue12 = mbAmount - discount;
      this.BatchData.data[index].gstValue12 = mbgstValue12;
    } else if (gst === '18') {
      mbgstValue18 = mbAmount - discount;
      this.BatchData.data[index].gstValue18 = mbgstValue18;
    } else if (gst === '28') {
      mbgstValue28 = mbAmount - discount;
      this.BatchData.data[index].gstValue28 = mbgstValue28;
    } else if (gst === '0') {
      mbgstValue0 = mbAmount - discount;
      this.BatchData.data[index].gstValue0 = mbgstValue0;
    }

    this.BatchData.data.forEach((element, i) => {
      amount = element.purPrice * element.quantity;

      if (element.disType === 'flat') {
        discountPrice += parseInt(element.discount.toString());
      } else if (element.disType === 'percentage') {
        discountPrice += (amount * element.discount) / 100;
      }

      if (element.gst === '5') {
        gstValue5 += element.gstValue5;
      } else if (element.gst === '12') {
        gstValue12 += element.gstValue12;
      } else if (element.gst === '18') {
        gstValue18 += element.gstValue18;
      } else if (element.gst === '28') {
        gstValue28 += element.gstValue28;
      } else if (element.gst === '0') {
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
    this.totalGstPrice =
      this.gstPrice5 + this.gstPrice12 + this.gstPrice18 + this.gstPrice28;
    this.total = this.amount + this.totalGstPrice;
    this.netAmount = this.total;
    this.Amount.push(new FormControl());
    this.Amount[index].setValue(mbAmount - discount);

    this.MarginValue.push(new FormControl());
    this.MarginValue[index].setValue(margin);
    this.intForm();
    this.div = false;
  }

  medicineFilter(event: any) {
    this.medicinesData.filter = event.target.value.trim().toLowerCase();
    this.medicines = this.medicinesData.filteredData;
  }
  medicibeId(id: number, index: number) {
    this.BatchData.data[index].productId = id;
    this.medicineService.getMedicinesById(id).subscribe((data) => {
      this.medicinesData = data;
      this.hsn.push(new FormControl());
      this.hsn[index].setValue(this.medicinesData.hsn.code);
      this.BatchData.data[index].hsn = this.medicinesData.hsn.code;
      this.gst.push(new FormControl());
      this.gst[index].setValue(this.medicinesData.hsn.gst);
      this.BatchData.data[index].gst = this.medicinesData.hsn.gst;
      this.packing.push(new FormControl());
      this.packing[index].setValue(this.medicinesData.packing);
      this.BatchData.data[index].packing = this.medicinesData.packing;
      this.units.push(new FormControl());
      this.units[index].setValue(this.medicinesData.units);
      this.BatchData.data[index].units = this.medicinesData.units;
      this.shortName.push(new FormControl());
      this.shortName[index].setValue(this.medicinesData.shortName);
      this.BatchData.data[index].shortName = this.medicinesData.shortName;
    });
    this.calculations(index);
  }
  supplierFilter(event: any) {
    this.suppliersData.filter = event.target.value.trim().toLowerCase();
    this.suppliers = this.suppliersData.filteredData;
  }
  supplierId(id: number) {
    this.sId = id;
    this.suppliersService.getSuppliersById(this.sId).subscribe((data) => {
      this.suppliersData = data;
      this.supplierAddress1 = this.suppliersData.address + ',';
      this.supplierAddress2 = this.suppliersData.city + ',';
      this.supplierAddress3 = this.suppliersData.pin + '.';
      this.userId = this.suppliersData.user.id;
      this.balanceSheetService
        .getBalanceSheetByUserId(this.userId)
        .subscribe((data) => {
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
    } else if (event.option) {
      value = event.option.value;
    } else {
      value = event.target.value;
    }
    this.BatchData.data[index][fieldName] = value;
  }

  createNewUser(): any {
    const data = {
      name: '',
      batchNumber: '',
      expiryDate: '',
      quantity: '',
      purPrice: '',
      mbSalePrice: '',
      disType: '',
      discount: '',
      actualCostPrice: '',
      packing: '',
      mfgDate: '',
      freeQuantity: 0,
      gstValue: 0,
      gst: '',
      hsn: '',
      disAmount: '',
      gstValue5: 0,
      gstValue12: 0,
      gstValue18: 0,
      gstValue28: 0,
      gstValue0: 0,
      createdBy: 0,
      product: {},
      mbCreatedAt: '',
      status: true,
      pId: 0,
    };
    return data;
  }
  addRow() {
    this.BatchData.data.push(this.createNewUser());
    this.BatchData.filter = '';
  }
  deleteRow(index: any) {
    this.calculations(index);
    this.BatchData.data = this.BatchData.data.filter((value: any, key: any) => {
      return key != index;
    });
  }
  chosenYearHandler(normalizedYear: Moment, index: number) {
    this.date.push(new FormControl(moment()));
    const ctrlValue = this.date[index].value;
    ctrlValue.year(normalizedYear.year());
    this.date[index].setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>,
    index: any
  ) {
    const ctrlValue = this.date[index].value;
    ctrlValue.month(normalizedMonth.month());
    this.date[index].setValue(ctrlValue);
    this.BatchData.data[index].expiryDate = ctrlValue;
    datepicker.close();
    const date =
      (new Date(this.date[index].value).getMonth() + 1).toString() +
      '-' +
      new Date(this.date[index].value).getFullYear().toString();
    this.addItem(ctrlValue, 'expiryDate', index);
  }

  mfgChosenYearHandler(MnormalizedYear: Moment, index: number) {
    this.mDate.push(new FormControl(moment()));
    const ctrlValue = this.mDate[index].value;
    ctrlValue.year(MnormalizedYear.year());
    this.mDate[index].setValue(ctrlValue);
  }

  mfgChosenMonthHandler(
    MnormalizedYear: Moment,
    Datepicker: MatDatepicker<Moment>,
    index: any
  ) {
    const ctrlValue = this.mDate[index].value;
    ctrlValue.month(MnormalizedYear.month());
    this.mDate[index].setValue(ctrlValue);
    // this.dataSource.data[index]['mfgDate'] = ctrlValue
    this.BatchData.data[index].mfgDate = ctrlValue;

    Datepicker.close();
    const mfgDate =
      (new Date(this.mDate[index].value).getMonth() + 1).toString() +
      '-' +
      new Date(this.mDate[index].value).getFullYear().toString();
    this.addItem(ctrlValue, 'mfgDate', index);
    // this.dataSource.data[index]['mfgDate'] = this.mDate[index].value
  }
}
