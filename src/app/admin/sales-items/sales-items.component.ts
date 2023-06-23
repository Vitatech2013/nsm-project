import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sales-items',
  templateUrl: './sales-items.component.html',
  styleUrls: ['./sales-items.component.scss']
})
export class SalesItemsComponent implements OnInit {
  Url = environment.root;
  isLoading: boolean;
  id: number;
  dataSource;
  orderItems: any;
  itemsData: any;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'sno',
    'date',
    'name',
    'product',
    'quantity',
    'amount'
  ];
 
  tAmount: number;
  quantity: number;
  totalLength = [10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  itemForm;
  usersData: any;
  users: any;
  sId: number;
  Data: any;
  totalQuantity: any;
  salesItemsForm = new FormGroup({
    name: new FormControl(),
    start: new FormControl(new Date()),
    end: new FormControl()
  });
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };

  constructor(
    private salesItemsService: SalesItemsService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit() {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.loadData();
    this.employeeService.getEmployees().subscribe(data => {
      this.usersData = data;
      console.log(this.usersData);
      this.usersData = new MatTableDataSource(this.usersData);
    });
  }

  async loadData() {
    const c = new Date(this.salesItemsForm.value.start);
    const start = moment(c).format('YYYY-MM-DD');
    let end = '';
    this.salesItemsService.getSalesItemsByUserAndDate({id: 0, date: start, todate: end}).subscribe((data) => {
      this.orderItems = data;
      this.Data = this.orderItems.saleItems[0];
      console.log(this.Data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  userNameFilter(event) {
    console.log(event.target.value);
    this.salesItemsForm.value.name = event.target.value;
    this.usersData.filter = event.target.value.trim().toLowerCase();
    this.users = this.usersData.filteredData;
  }
  usersId(id: number, name: any) {
    this.salesItemsForm.value.name = name;
    this.sId = id;
    console.log(this.salesItemsForm.value.name);
    console.log(this.sId);
  }
  getTotalQuantity() {
    return this.Data.reduce((accum, curr) => accum + parseInt(curr.Quantity), 0);
  }
  async itemReports(){
    let c = new Date(this.salesItemsForm.value.start);
    let d = new Date(this.salesItemsForm.value.end);
    let start = moment(c).format('YYYY-MM-DD');
    let end = moment(d).format('YYYY-MM-DD');
   
    if (this.salesItemsForm.value.start !== null) {
      c = new Date(this.salesItemsForm.value.start);
      start = moment(c).format('YYYY-MM-DD');
    } else {
      start = '';
    }
    if (this.salesItemsForm.value.end !== null) {
      d = new Date(this.salesItemsForm.value.end);
      end = moment(d).format('YYYY-MM-DD');
    } else {
      end = '';
    }
    this.sId = 0;
    if(this.salesItemsForm.value.name !== null){
      this.users.map(emp => {
        console.log(this.salesItemsForm.value.name);
        console.log(emp.user.fullName);
        if (this.salesItemsForm.value.name === emp.user.fullName){
          this.sId = emp.user.id;
          console.log(this.sId);
        }
      });
    }
    console.log(this.sId);
    if (this.sId === null || this.sId === undefined) {
      this.sId = 0;
    }
    console.log(this.sId,  start, end);
    this.salesItemsService.getSalesItemsByUserAndDate({id: this.sId, date: start, todate: end}).subscribe((data) => {
      console.log(data);
      this.orderItems = data;
      this.Data = this.orderItems.saleItems[0];
      console.log(this.Data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
    });
  }
}

