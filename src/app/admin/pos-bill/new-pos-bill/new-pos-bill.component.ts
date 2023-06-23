import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BatchModel } from 'src/app/shared/models/batch.model';
import { BillModel } from 'src/app/shared/models/Bill.model';
import { BatchService } from 'src/app/shared/services/batch.service';
import { PosBillService } from 'src/app/shared/services/pos-bill.service';

@Component({
  selector: 'app-new-pos-bill',
  templateUrl: './new-pos-bill.component.html',
  styleUrls: ['./new-pos-bill.component.scss']
})
export class NewPosBillComponent implements OnInit {
  displayedColumns: string[] = [
    'mbId',
    'mbName',
    'mbBatch',
    'Quantity',
    'mPrice',
    'mbPurchasePrice',
    'mbTax',
    'mbTaxPrice',
    'mbamount'

  ];
  disAmt: any;
  discountAmt = 0
  discount = 0
  netAmt = 0
  subtotal = 0
  isLoading!: boolean;
  dataSource: MatTableDataSource<BatchModel>;
  batchData: any;
  id!: number;
  invoiceNumber: string;
  // pageIndex!: number;
  // pageSize!: number;
  // total!: number;
  // totalLength = [10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  medicines: any;
  mbSalePrice = [];
  batchData1: any;
  mbBatch = [];
  mbPurchasePrice = [];
  mbTax = [];
  mbTaxPrice = [];
  mbPrice = [];
  price: any;
  mbQuantity = [];
  Quantity = [];
  mbAmounts: any;
  gstPrice0 = 0;
  gstPrice5 = 0;
  gstPrice12 = 0;
  gstPrice18 = 0;
  gstPrice28 = 0;
  totalGstPrice = 0;
  gstValue0 = 0;
  gstValue5 = 0;
  gstValue12 = 0;
  gstValue18 = 0;
  gstValue28 = 0;
  discountPrice = 0;
  amount = 0;
  total = 0.00;
  Amount = [];
  mbamount = [];
  perMPrice = [];
  mprice: number;
  length: number;
  dataSourcedata: MatTableDataSource<BillModel>;;
  num: number;
  salesdata: any;
  tot: number;

  constructor(private batchService: BatchService, private posBillService: PosBillService, private router: Router,
    private snackbar: MatSnackBar) {
    const users: any = [];
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.data.push(this.createNewUser())
  }

  posBillForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    // dId: new FormControl('', [Validators.required,]),
    doctorId: new FormControl('', [Validators.required,]),
    // mail: new FormControl('', [Validators.required,]),
    subTotal: new FormControl('', Validators.required),
    discountAmt: new FormControl('', Validators.required),
    netAmt: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    invoiceNumber: new FormControl('', Validators.required),

    rate: new FormControl('', Validators.required),
    value0: new FormControl('', Validators.required),
    value5: new FormControl('', Validators.required),
    value12: new FormControl('', Validators.required),
    value18: new FormControl('', Validators.required),
    value28: new FormControl('', Validators.required),
    gst5: new FormControl('', Validators.required),
    gst12: new FormControl('', Validators.required),
    gst18: new FormControl('', Validators.required),
    gst28: new FormControl('', Validators.required),
    totalGst: new FormControl('', Validators.required),
    round: new FormControl('', Validators.required),
    margin: new FormControl('', Validators.required),
    paymenType: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),

  });

  ngOnInit(): void {
    this.ReadBatchDetails();
    this.getdate();
    // let date = year + '-' + month + '-' + datee;
  }
  Discount(event) {
    this.discount = event.target.value
    this.disAmt = (this.amount * (this.discount) / 100)
    this.total = this.amount - this.disAmt

  }

  ReadBatchDetails() {
    this.batchService.getBatch().subscribe(data => {
      this.batchData = data;
      this.batchData1 = data;
      this.batchData1 = new MatTableDataSource(this.batchData1)
    })
  }
  medicineFilter(event: any) {
    this.data.filter = event.target.value.trim().toLowerCase();
    this.medicines = this.data.filteredData
  }
  getdate() {
    this.posBillService.getSales().subscribe(data => {
      this.salesdata = data;
      this.dataSourcedata = new MatTableDataSource(this.salesdata);
      this.tot = this.dataSourcedata.data.length;
      console.log(this.tot);
    });
    this.num = this.tot + 1
    console.log(this.num);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    console.log(currentMonth + 1);
    const month = currentMonth + 1
    let financialYear = ""
    if (month >= 4) {
      financialYear = currentYear + '-' + currentYear + 1

    }
    else {
      financialYear = currentYear - 1 + '-' + currentYear
    }
    if (this.num > 0 && this.num <= 9)
      this.invoiceNumber = "NSM000" + this.num + '/' + financialYear;
    else if (this.num > 9 && this.num <= 99)
      this.invoiceNumber = "NSM00" + this.num + '/' + financialYear;
    else if (this.num > 99 && this.num <= 999)
      this.invoiceNumber = "NSM0" + this.num + '/' + financialYear;
    else
      this.invoiceNumber = "NSM" + this.num + '/' + financialYear;
    console.log(this.invoiceNumber)
  }

  addItem(event: any, fieldName: any, index: any) {
    let value;
    if (typeof event === "string") {
      value = event
    } else if (event['option']) {
      value = event.option.value
    } else {
      value = event.target.value
    }
    this.dataSource.data[index][fieldName] = value
  }
  createNewUser(): BatchModel | any {
    let data = {
      subTotal: '',
      totalGst: '',
      netAmount: '',
      mbName: "",
      mbBatch: "",
      mbQuantity: "",
      Quantity: "",
      mPrice: "",
      mbPrice: "",
      mbamount: "",
      mbPurchasePrice: "",
      mbSalePrice: "",
      eId: 0,
      mId: 0,
      mbCreatedAt: '',
      mbStatus: true,
      pId: 0,

    };
    return data

  }
  addRow() {
    this.dataSource.data.push(this.createNewUser());
    console.log(this.dataSource.data);
    this.dataSource.filter = "";
  }
  medicibeId(id: number, index: number) {

    // this.dataSource.data[index]['mbId'] = id
    // let Quantity = this.dataSource.data[index]['Quantity']
    // this.batchService.getBatchById(id).subscribe(data => {
    //   this.batchData1 = data
    //   this.mbSalePrice.push(new FormControl())
    //   this.mbSalePrice[index].setValue(this.batchData1.mbSalePrice)
    //   this.dataSource.data[index].mbSalePrice = this.batchData1.mbSalePrice

    //   this.mbBatch.push(new FormControl())
    //   this.mbBatch[index].setValue(this.batchData1.mbBatch)
    //   this.dataSource.data[index].mbBatch = this.batchData1.mbBatch

    //   this.mbPurchasePrice.push(new FormControl())
    //   this.mbPurchasePrice[index].setValue(this.batchData1.mbPurchasePrice)
    //   this.dataSource.data[index].mbPurchasePrice = this.batchData1.mbPurchasePrice

    //   this.mbTax.push(new FormControl())
    //   this.mbTax[index].setValue(this.batchData1.mbTax)
    //   this.dataSource.data[index].mbTax = this.batchData1.mbTax

    //   this.mbPrice.push(new FormControl())
    //   this.mbPrice[index].setValue(this.batchData1.mbPrice)
    //   this.dataSource.data[index].mbPrice = this.batchData1.mbPrice
    //   this.price = this.mbPrice[index].value

    //   this.mbQuantity.push(new FormControl())
    //   this.mbQuantity[index].setValue(this.batchData1.mbQuantity)
    //   this.dataSource.data[index].mbQuantity = this.batchData1.mbQuantity

    //   this.perMPrice.push(new FormControl())
    //   this.perMPrice[index].setValue(this.price / this.mbQuantity[index].value)

    //   this.mbamount.push(new FormControl())
    //   this.mbamount[index].setValue(Quantity * this.perMPrice[index].value)

    //   this.mbTaxPrice.push(new FormControl())
    //   this.mbTaxPrice[index].setValue(this.batchData1.mbTaxPrice)
    //   this.dataSource.data[index].mbTaxPrice = this.batchData1.mbTaxPrice
    //   if (this.mbTaxPrice[index].value === 5) {
    //     this.gstValue5 = this.mbamount[index].value + this.gstValue5
    //     this.gstPrice5 = ((this.mbamount[index].value * (this.mbTaxPrice[index].value)) / 100) + this.gstPrice5
    //     this.totalGstPrice = this.gstPrice5 + this.gstPrice12 + this.gstPrice18 + this.gstPrice28
    //   }
    //   else if (this.mbTaxPrice[index].value === 12) {
    //     this.gstValue12 = this.mbamount[index].value + this.gstValue12
    //     this.gstPrice12 = (this.mbamount[index].value * (this.mbTaxPrice[index].value) / 100) + this.gstPrice12
    //     this.totalGstPrice = this.gstPrice12 + this.gstPrice5 + this.gstPrice18 + this.gstPrice28
    //   }
    //   else if (this.mbTaxPrice[index].value === 18) {
    //     this.gstValue18 = this.price + this.gstValue18
    //     this.gstPrice18 = (this.mbamount[index].value * (this.mbTaxPrice[index].value) / 100) + this.gstPrice18
    //     this.totalGstPrice = this.gstPrice12 + this.gstPrice5 + this.gstPrice18 + this.gstPrice28
    //   }
    //   else if (this.mbTaxPrice[index].value === 28) {
    //     this.gstValue28 = this.price + this.gstValue28
    //     this.gstPrice28 = ((this.mbamount[index].value * (this.mbTaxPrice[index].value)) / 100) + this.gstPrice28
    //     this.totalGstPrice = this.gstPrice12 + this.gstPrice5 + this.gstPrice18 + this.gstPrice28
    //   }

    //   this.amount = this.gstValue5 + this.gstValue12 + this.gstValue18 + this.gstValue28 + this.gstValue0
    //   this.dataSource.data[index]['subTotal'] = this.amount;
    //   this.total = this.amount + this.totalGstPrice
    //   this.dataSource.data[index]['netAmount'] = this.total;

    // })
  }
  insertsales() {
    this.posBillService.addSales(this.dataSource.data).subscribe(data => {
      console.log(data);
      if (data) {
        this.snackbar.open('Sales Added!', 'Success', {
          duration: 2000,
        });
      }
    });
  }

}
