import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../../services/orders.service';
import { TablesService } from '../../services/tables.service';
import { UsersService } from '../../services/users.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-waiter-reports',
  templateUrl: './waiter-reports.component.html',
  styleUrls: ['./waiter-reports.component.scss']
})
export class WaiterReportsComponent implements OnInit {
  isLoading: boolean;
  displayedColumns: string[] = ['sno', 'tableNumber', 'role', 'username', 'orderStatus', 'amount', 'discount', 'totalAmount', 'date'];

  dataSource;
  data;
  userData: any;
  filterUserData = []
  pageIndex: number;
  pageSize: number;
  total: number;
  tAmount: number;
  totalLength = [10];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  rangeForm = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(),
    tableId: new FormControl("All")
  });
  constructor(
    private orderService: OrdersService,
    private usersService: UsersService, public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.getWaitersAndReceptionist().subscribe(data => {
      this.userData = data
      this.userData[0].map(data => {
        this.filterUserData.push(data)
      })
      this.userData[1].map(data => {
        this.filterUserData.push(data)
      })

    })
    this.loadData();
  }
  async loadData() {
    if (this.rangeForm.value.end == null) {
      this.rangeForm.value.end = this.rangeForm.value.start
    }
    this.orderService.waiterOrderReports(this.rangeForm.value.start, this.rangeForm.value.end, this.rangeForm.value.tableId).subscribe(data => {
      this.isLoading = false;
      this.dataSource = data
      this.tAmount = 0
      this.dataSource.forEach(e => {
        this.tAmount += e.totalAmount
      })
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      }
      else {
        this.totalLength = [10, 25, 50, 100];
      }
    })
  }
  getOrderReports() {
    if (this.rangeForm.value.end == null) {
      this.rangeForm.value.end = this.rangeForm.value.start
    }
    this.orderService.waiterOrderReports(this.rangeForm.value.start, this.rangeForm.value.end, this.rangeForm.value.tableId).subscribe(data => {
      this.isLoading = false;
      this.dataSource = data;
      this.tAmount = 0
      this.dataSource.forEach(e => {
        this.tAmount += e.totalAmount
      })
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      }
      else {
        this.totalLength = [10, 25, 50, 100];
      }
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "WaiterReports";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  }

  exportTable() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
      const dataToExport = this.dataSource.filteredData
        .map(x => ({
          tableNumber: x.table.tableNumber,
          role: x.waiter.role.role,
          username: x.waiter.username,
          orderStatus: x.orderStatus.orderStatus,
          amount: x.amount,
          discount: x.discount,
          totalAmount: x.totalAmount,
          date: this.datepipe.transform(x.date, 'yyyy-MM-dd')
        }));

      let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
      let workBook: XLSX.WorkBook = XLSX.utils.book_new();

      // Adjust column width
      var wscols = [
        { wch: 15 }
      ];

      workSheet["!cols"] = wscols;
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
      XLSX.writeFile(workBook, `WaiterReports.xlsx`);
    }

  }

}
