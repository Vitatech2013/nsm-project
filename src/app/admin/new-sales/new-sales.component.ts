import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { UserModel } from 'src/app/shared/models/user.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';
import { PosBillService } from 'src/app/shared/services/pos-bill.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.scss'], animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NewSalesComponent implements OnInit {

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
  saleitemsData:any
  salesdata:any
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
  saleid: any;

  constructor(
    private salesItemService: SalesItemsService,
    private salesService:PosBillService,
    private employeeService: EmployeeService,
    private detector: ChangeDetectorRef
  ) { }
  salesForm = new FormGroup({
    name: new FormControl(),
    date: new FormControl(new Date())
  });


  ngOnInit() {
    this.loadData();
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe(data => {
      this.usersData = data;
      console.log(this.usersData);
      this.usersData = new MatTableDataSource(this.usersData);
    });
  }
  async loadData() {
    const c = new Date(this.salesForm.value.date);
    console.log(c);
    this.date = moment(c).format('YYYY-MM-DD');
    console.log(this.date);
    this.salesItemService.getNewSalesById({ id: 0, date: this.date }).subscribe(data => {
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async itemReports() {
    console.log(this.sId);
    console.log(this.salesForm.value.name);
    console.log(this.salesForm.value.date);
    let c = null;
    if (this.salesForm.value.date !== null) {
      c = new Date(this.salesForm.value.date);
      this.date = moment(c).format('YYYY-MM-DD');
    } else {
      this.date = '';
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
    console.log(this.sId);
    this.salesItemService.getNewSalesById({ id: this.sId, date: this.date }).subscribe(data => {
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
