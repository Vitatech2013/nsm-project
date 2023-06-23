import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { UserModel } from 'src/app/shared/models/user.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';
import { environment } from 'src/environments/environment';
 import { Moment} from 'moment';
// tslint:disable-next-line:no-duplicate-imports

import * as _rollupMoment from 'moment';

import {MatDatepicker} from '@angular/material/datepicker';

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PosBillService } from 'src/app/shared/services/pos-bill.service';
import { InventoryMedicinesService } from 'src/app/shared/services/products.service';
     const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
     dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-monthly-sales',
  templateUrl: './monthly-sales.component.html',
  styleUrls: ['./monthly-sales.component.scss'], 
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
   providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class MonthlySalesComponent implements OnInit {

  Url = environment.root;
  isLoading: boolean;
  id: number;
  dataSource;
  dataSource1;

  data: any;
  itemsData: any;
  userId: number;
  salesData: any;
  Data: any;
  name: any;
  totalLength = [10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  usersData: any;
  itemData = [];
  d:boolean;
  
  users: UserModel | any;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  @ViewChild('sort', { static: false }) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    // 'user',
    'date',
    'invoiceNum',
    'name',
    'mobile',                    
    'totalAmount',
    'disAmount',
    'netAmount',
    'action'
  ];

  innerDisplayedColumns = ['name', 'expiryDate', 'mrp', 'quantity', 'netAmount'];
  expandedElement = 'collapsed';
  dataArray = [];
  tAmount: number;
  quantity: number;
  itemForm;
  date: any;
  sId: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  saleitemsData: any;
  date1: any;
  year: string;
  month: string;
  salesdata: any;
  saleid: any;
  scheduleCategory: any;
  scheduleCategoryData: any;
  specialCategory: any;
  specialCategoryData: any;
  specialCatId: number;
  scheduleCatId: number;

  constructor(
    private salesItemService: SalesItemsService,
    private salesService:PosBillService,
    private employeeService: EmployeeService,
    private detector: ChangeDetectorRef,private medicinesService: InventoryMedicinesService,
  ) { }
  date11= new FormControl(moment())
  salesForm = new FormGroup({
    name: new FormControl(),
    date: new FormControl(new Date()),
   date11: new FormControl(moment()),
   specialCategory: new FormControl('',),
   scheduleCategory: new FormControl('', ),
  });


  ngOnInit() {
    
    this.d=false
    this.loadData();
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe(data => {
      this.usersData = data;
      console.log(this.usersData);
      this.usersData = new MatTableDataSource(this.usersData);
    });
    this.medicinesService.getscheduleCategory().subscribe(data => {
      this.scheduleCategory = data;
      this.scheduleCategoryData = data;
      console.log(this.scheduleCategoryData);
      this.scheduleCategoryData = new MatTableDataSource(this.scheduleCategoryData);
    });
    this.medicinesService.getspecialCategory().subscribe(data => {
      this.specialCategory = data;
      this.specialCategoryData = data;
      console.log(this.specialCategoryData);
      this.specialCategoryData = new MatTableDataSource(this.specialCategoryData);
    });
  
  }
  async loadData() {
    const c = this.date11.value;
    this.month = moment(c).format('MM');
    this.year=moment(c).format('YYYY');
    this.salesItemService.getMonthlySalesById({month: this.month,year:this.year,employee: 0}).subscribe(data => {
      this.itemsData = data;
      this.Data = this.itemsData.salesData;
      console.log(this.Data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }
  userNameFilter(event) {
    console.log(event.target.value);
    this.salesForm.value.name = event.target.value;
    this.usersData.filter = event.target.value.trim().toLowerCase();
    this.users = this.usersData.filteredData;
  }
  usersId(id: number, name: any) {
    this.salesForm.value.name = name;
    this.sId = id;
    console.log(this.salesForm.value.name);
    console.log(this.sId);
  }
  specialCategoryFilter(event: any) {
    this.specialCategoryData.filter = event.target.value.trim().toLowerCase();
    this.specialCategory = this.specialCategoryData.filteredData;
    console.log(this.specialCategory);
  }

  specialCategoryId(id: number) {
    this.specialCatId = id;
    this.salesForm.value.specialCategory = id;
   
      
  }
  scheduleCategoryFilter(event: any) {
    this.scheduleCategoryData.filter = event.target.value.trim().toLowerCase();
    this.scheduleCategory = this.scheduleCategoryData.filteredData;
  }

  scheduleCategoryId(id: number) {
    this.scheduleCatId = id;
    this.salesForm.value.scheduleCategory = this.scheduleCatId;
   
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async itemReports() {
    console.log(this.sId);
    console.log(this.salesForm.value.name);
    console.log(this.date11.value);
    let c = null;
    if (this.salesForm.value.date11 !== null) {
      c  = this.date11.value;;
      this.month = moment(c).format('MM');
      this.year = moment(c).format('YYYY');

    } else {
      this.month = '';
      this.year = '';
    }
    this.sId = 0;
    this.users.map(emp => {
      console.log(this.salesForm.value.name);
      console.log(emp.user.fullName);
      if (this.salesForm.value.name === emp.user.fullName){
        this.sId = emp.user.id;
        console.log(this.sId);
      }
    });
    console.log(this.sId);
    if (this.sId === null || this.sId === undefined) {
      this.sId = 0;
    }
    console.log(this.sId,this.month,this.year);
    this.salesItemService.getMonthlySalesById({month:this.month,year:this.year,employee:this.sId}).subscribe(data => {
      this.itemsData = data;
      this.Data = this.itemsData.salesData;
      console.log(this.Data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date11.value;
    
    ctrlValue.year(normalizedYear.year());
    this.date11.setValue(ctrlValue);
    console.log(this.date11)
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date11.value;
    ctrlValue.month(normalizedMonth.month());
    this.date11.setValue(ctrlValue);
    console.log(this.date11);
    
    datepicker.close();
  }
  // let array = [];
  // let added = false;
  //   if (this.salesForm.value.name){
  //     this.salesService.getSalesById(this.sId).subscribe(data => {
  //       this.itemsData = data;
  //       this.Data = this.itemsData.salesData;
  //       console.log(this.Data);
  //       this.dataArray = this.Data;
  //       console.log(this.dataArray);
  //       this.isLoading = false;
  //       this.dataSource = new MatTableDataSource(this.Data);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.total = this.dataSource.data.length;
  //   });
  //  }
  //   else{
  //   const c = new Date(this.salesForm.value.date);
  //   console.log(c);
  //   this.date = moment(c).format('YYYY-MM-DD');
  //   this.salesService.getSalesById(this.sId, this.date).subscribe(data => {
  //       this.itemsData = data;
  //       this.Data = this.itemsData.salesData;
  //       console.log(this.Data);
  //       this.Data.map(item => {
  //       let d = new Date(item.date);
  //       console.log(d);
  //       const data = {
  //           date: moment(d).format('YYYY-MM-DD'),
  //           invoiceNum: item.invoiceNum,
  //           name: item.name,
  //           mobile: item.mobile,
  //           totalAmount: item.totalAmount,
  //           disAmount: item.disAmount,
  //           netAmount: item.netAmount,
  //           salesItem: item.salesItem
  //         };
  //       console.log(data);
  //       if (!added){
  //            array.push(data);
  //         }
  //       added = false;
  //       });
  //       if (date){
  //         array.map(data1 => {
  //           if (data1.date === date){
  //               this.dataArray.push(data1);
  //           }
  //         });
  //       }
  //       else{
  //         this.dataArray = array;
  //       }
  //       console.log(this.dataArray);
  //       this.isLoading = false;
  //       this.dataSource = new MatTableDataSource(this.dataArray);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.total = this.dataSource.data.length;
  //   });
  // }
  // expandData(){
  //   this.salesService.getSalesById(this.sId).subscribe((data) => {
  //     console.log(data);
  //     this.itemsData = data;
  //     this.Data = this.itemsData.salesData;
  //     console.log( this.Data);
  //   this.Data.forEach(user => {
  //   console.log(user);
  //     // tslint:disable-next-line: align
  //     if (user.salesItem && Array.isArray(user.salesItem) && user.salesItem.length) {
  //       this.itemData = [...this.itemData, {...user, salesItem: new MatTableDataSource(user.salesItem)}];
  //       console.log(this.itemData);
  //       console.log(user.salesItem);
  //     }
  //     else {
  //       this.itemData = [...this.itemData, user];
  //       console.log(this.itemData);
  //     }
  //   });
  //     this.usersData = new MatTableDataSource(this.Data);
  //     this.usersData.sort = this.sort;
  // });
  // }

  // toggleRow(element: any) {
  //   console.log(element.salesItem);
  //   element.salesItem && (element.salesItem as MatTableDataSource<any>)
  //   .data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
  //   this.detector.detectChanges();
  //   this.innerTables.forEach((table, index) => 
  //   (table.dataSource as MatTableDataSource<any>).sort = this.innerSort.toArray()[index]);
  // }

  // innerApplyFilter(filterValue: string) {
  //   this.innerTables.forEach((table, index) => 
  //   (table.dataSource as MatTableDataSource<any>).filter = filterValue.trim().toLowerCase());
  // }
  expanded(data:any){
  console.log(data,"///////");  
this.salesService.getSalesId(data.id).subscribe((data1) => {
this.salesdata=data1
// console.log(this.salesdata.salesItem,",,,,,,,,,,,,,,,,,,,,,,,,");
this.saleitemsData=this.salesdata.salesItem
console.log(this.saleitemsData,",,,,,,,,,,,,,,,,,,,,,,,,");

this.dataSource1 = new MatTableDataSource(this.saleitemsData);  
// this.saleid=this.salesdata.created.id
// console.log(this.saleid,"///////");

//     this.salesItemService.getNewSalesItemBySaleId(this.saleid).subscribe((data) => {
//       this.saleitemsData = data;
//       console.log(this.saleitemsData);
//       this.dataSource1 = new MatTableDataSource(this.saleitemsData);  

//     })
  })
   this.expandedElement = data;
   


  }

}
