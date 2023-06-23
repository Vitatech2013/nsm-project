import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentTypeModel } from 'src/app/shared/models/payment-type.model';
import { PurchaseModel } from 'src/app/shared/models/purchase.model';
import { SupplierModel } from 'src/app/shared/models/supplier.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { BalanceSheetService } from 'src/app/shared/services/balance-sheet.service';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { SuppliersService } from 'src/app/shared/services/suppliers.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.scss'],
})
export class NewPaymentsComponent implements OnInit {
  sId: number;
  created: number;
  purchaseId: number;
  id: number;
  userId: number;
  netAmount = 0;
  paidAmount = 0;
  dueAmount = 0;
  dueAmount1 = 0;
  userBalance = 0;
  newAmount = 0;
  expenseAmount: any;

  date = new Date().toISOString().toString().split('T')[0];
  suppliers: SupplierModel | any;
  suppliersData: any;
  paymentTypes: PaymentTypeModel[];
  users: UserModel[] | any;
  supplierAddress1: string;
  supplierAddress3: string;
  supplierAddress2: string;
  dataSource: any;
  dataSource1: any;
  isLoading!: boolean;
  address: boolean;
  purchaseData: any;
  balanceSheetData: any;
  data: PurchaseModel[] | any;
  totalLength = [1000];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  selectedRowIndex: any;
  tempData = [];

  paymentForm = new FormGroup({
    date: new FormControl(this.date, Validators.required),
    description: new FormControl(''),
    paymentType: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    created: new FormControl('', Validators.required),
  });

  singleRecordPaymentForm = new FormGroup({
    date: new FormControl(this.date, Validators.required),
    description: new FormControl(''),
    paymentType: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    created: new FormControl('', Validators.required),
  });

  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png',
  };

  displayedColumns: string[] = [
    'sno',
    // 'id',
    // 'name',
    'amount',
    'itemDisAmount',
    'subTotal',
    'tax',
    'total',
    'discount',
    'netAmount',
   
    'newpaidAmount',
    'olddueAmount',
    'date',
    'paidAmount',
    'dueAmount',
    'updatedAt',
    'actions',
  ];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedData: any;
  balance = 0;
  selectedDataDueAmount = 0;
  amount: number;
  discountAmount = 0;
  discountAmountP = 0;
  amount1: number;
  itemsArray: any;
  fullData = true;
  itemsArray1 = [];

  constructor(
    private purchaseService: PurchaseService,
    private suppliersService: SuppliersService,
    private paymentTypeService: PaymentTypeService,
    private balanceSheetService: BalanceSheetService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private expenseService: ExpensesService
  ) {}

  ngOnInit(): void {
    this.created = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.suppliersService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
      this.suppliersData = data;
      this.suppliersData = new MatTableDataSource(this.suppliersData);
    });
    this.paymentTypeService.getPaymentType().subscribe((data) => {
      this.paymentTypes = data as PaymentTypeModel[];
    });
  }
  supplierFilter(event: any): void {
    this.suppliersData.filter = event.target.value.trim().toLowerCase();
    this.suppliers = this.suppliersData.filteredData;
  }
  supplierId(id: number): void {
    this.itemsArray1 = [];
    this.isLoading = false;
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
          this.balanceSheetData = data;
          if (!this.balanceSheetData[0]) {
            this.userBalance = 0;
          } else {
            this.userBalance = this.balanceSheetData[0].balance;
          }
        });

      this.purchaseService
        .getPurchaseByUserId(this.suppliersData.user.id)
        .subscribe((data) => {
          this.isLoading = false;
          this.purchaseData = data;
          this.purchaseData.map((e) => {
            e.days = 0;
            e.balance = e.dueAmount;
            e.newPaid = e.paidAmount;
            const date1 = new Date(e.createdAt);
            const date2 = new Date();
            e.days = date2.getDate() - date1.getDate();
          });
          this.dataSource = new MatTableDataSource(this.purchaseData);
          this.dataSource.sort = this.sort;
          this.total = this.dataSource.data.length;
          this.netAmount = 0;
          this.paidAmount = 0;
          this.dueAmount = 0;
          this.purchaseData.forEach((e) => {
            this.netAmount += e.netAmount;
            this.paidAmount += e.paidAmount;
            this.dueAmount += e.dueAmount;
            this.paymentForm.value.netAmount = this.paidAmount;
            this.dueAmount1 = this.dueAmount;
          });
        });
    });
  }

  highlight(row: any) {
    this.selectedRowIndex = 1;
    this.selectedData = row;
  }
  onClick(row: any, i) {
    this.selectedRowIndex = i + 1;
    this.selectedData = row;
    this.selectedDataDueAmount = row.dueAmount;
    this.balance = this.selectedDataDueAmount - this.amount;
  }

  calculations(event: any) {
    this.tempData = [];
    const amount = parseInt(event.target.value);
    this.purchaseData.forEach((x) => {
      this.tempData.push(Object.assign({}, x));
    });
    this.tempData.forEach((e, i) => {
      if (!this.itemsArray1.includes(i)) {
        if (this.newAmount > 0) {
          if (this.newAmount < this.tempData[i].dueAmount) {
            this.tempData[i].dueAmount = this.tempData[i].dueAmount - this.newAmount;
            this.dueAmount1 = this.dueAmount - amount;
            this.tempData[i].paidAmount = this.newAmount;
            this.newAmount = 0;
          } else {
            this.newAmount = this.newAmount - parseInt(this.tempData[i].dueAmount);
            // this.tempData[i].newPaid = this.tempData[i].balance;
            this.tempData[i].dueAmount = 0;
            this.tempData[i].paidAmount = this.tempData[i].balance;
          }
        }
      }
    });
    this.dataSource = new MatTableDataSource(this.tempData);
    this.dataSource.sort = this.sort;
    this.newAmount = amount;
    this.expenseAmount = amount;
    this.paidAmount = amount;
    this.selectedRowIndex = '';
  }

  onDiscountP(event: any) {
    this.amount = parseFloat(event.target.value);
    this.discountAmountP = (this.balance * this.amount) / 100;
    if(this.balance === NaN){
      this.balance = this.balance - this.discountAmountP;
    }
  }

  onDiscount(event: any) {
    this.discountAmountP = parseFloat(event.target.value);
    this.discountAmount = this.discountAmountP - this.discountAmountP;
    this.balance = this.selectedDataDueAmount - (this.amount1 + this.discountAmountP);
  }

  onAmount(event: any) {
    this.amount1 = parseInt(event.target.value);
    this.balance = this.selectedDataDueAmount - this.amount1;
  }

  deleteRow(id: any, i: any) {
    this.itemsArray1.push(i);
    this.fullData = false;
    const event = { target: { value: this.newAmount } };
    this.calculations(event);
  }

  onOk() {
    if (!this.selectedData) {
      alert('No data found');
    } else if (!this.amount1) {
      alert('Amount not Declared!');
    } else {
      const updatedPurData = {
        dueAmount: this.balance,
        paidAmount: this.selectedData.paidAmount + this.amount1,
        disAmount: this.selectedData.disAmount,
        updated: this.created,
        netAmount: this.selectedData.netAmount - this.discountAmountP,
        extraDisAmount: this.selectedData.extraDisAmount + this.discountAmountP,
      };
      this.purchaseService
        .updatePurchaseAmount(this.selectedData.id, updatedPurData)
        .subscribe((data) => {
          if (updatedPurData.dueAmount === 0) {
            this.itemsArray = this.dataSource.filteredData.filter(
              (value, key) => {
                return value.id !== this.selectedData.id;
              }
            );
            this.dataSource = new MatTableDataSource(this.itemsArray);
          }
          this.purchaseService
            .getPurchaseByUserId(this.suppliersData.user.id)
            .subscribe((data) => {
              this.isLoading = false;
              this.purchaseData = data;
              this.purchaseData.map((e) => {
                const date1 = new Date(e.createdAt);
                const date2 = new Date();
                let Difference_In_Time = date2.getTime() - date1.getTime();
                e.days = Difference_In_Time / (1000 * 3600 * 24);
                e.days = parseInt(e.days).toString();
                e.balance = e.dueAmount;
                e.newPaid = e.paidAmount;
              });
              this.purchaseData.forEach((e) => {
                this.netAmount += e.netAmount;
                this.paidAmount += e.paidAmount;
                this.dueAmount += e.dueAmount;
                this.paymentForm.value.netAmount = this.paidAmount;
                this.dueAmount1 = this.dueAmount;
              });
              this.dataSource = new MatTableDataSource(this.purchaseData);
              this.dataSource.sort = this.sort;
              this.total = this.dataSource.data.length;
              this.netAmount = 0;
              this.paidAmount = 0;
              this.dueAmount = 0;
            });
          this.balance = 0;
          this.selectedDataDueAmount = 0;
          this.netAmount = 0;
          this.paidAmount = 0;
          this.dueAmount = 0;
          this.dueAmount1 = 0;
          this.userBalance = 0;
          this.discountAmount = 0;
          this.discountAmountP = 0;
          alert('data updated Successfully!');
        });
      this.selectedRowIndex = '';
      this.supplierId(this.sId);
    }
  }

  onSubmit() {
    if (this.paymentForm.valid === false){
      return;
    }
    this.selectedRowIndex = '';
    const balanceSheetData = {
      userId: this.userId,
      credit: 0,
      debit: this.newAmount,
      balance: this.userBalance - this.newAmount,
      invoiceNumbers: '0',
      description: this.paymentForm.value.description,
      paymentTypeId: this.paymentForm.value.paymentType,
      created: this.created,
    };
    this.balanceSheetService.addBalanceSheet(balanceSheetData).subscribe(
      (data) => {
        alert('data added successfully!');
      },
      (err) => alert('error')
    );

    this.userService.getUserById(this.userId).subscribe((data) => {
      this.users = data as UserModel[];
      const expenceData = {
        userId: this.userId,
        name: this.users.fullName,
        amount: parseInt(this.expenseAmount),
        date: this.paymentForm.value.date,
        expenseTypeId: 1,
        description: this.paymentForm.value.description,
        paymentTypeId: this.paymentForm.value.paymentType,
        created: this.created,
      };
      this.expenseService.addExpenses(expenceData).subscribe(
        (data) => {
          console.log('user data fetched successfully!');
        },
        (err) => alert('error')
      );
    });
    this.tempData.map((purchaseData) => {
            const updatedPurData = {
              dueAmount: purchaseData.dueAmount,
              paidAmount: purchaseData.paidAmount,
              updated: this.created,
            };
            this.purchaseService
              .updatePurchaseAmount(purchaseData.id, updatedPurData)
              .subscribe((data) => {
              });
            this.newAmount = 0;
      });
    this.supplierId(this.sId);
  }
}
