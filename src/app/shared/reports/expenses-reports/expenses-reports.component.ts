import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../../services/orders.service';
import * as XLSX from 'xlsx';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-expenses-reports',
  templateUrl: './expenses-reports.component.html',
  styleUrls: ['./expenses-reports.component.scss']
})
export class ExpensesReportsComponent implements OnInit {

  isLoading: boolean;
  displayedColumns: string[] = ['sno', 'name', 'type', 'paymentMode', 'employee', 'amount', 'date'];

  dataSource;
  data;
  tAmount: number
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };

  rangeForm = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl()
  });


  constructor(
    private expensesService: ExpensesService, public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }
  async loadData() {
    if (this.rangeForm.value.end == null) {
      this.rangeForm.value.end = this.rangeForm.value.start
    }
    this.expensesService.ExpenseReports(this.rangeForm.value.start, this.rangeForm.value.end).subscribe(data => {
      this.isLoading = false;
      this.dataSource = data;
      this.tAmount = 0
      this.dataSource.forEach(e => {
        this.tAmount += e.amount
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
    this.expensesService.ExpenseReports(this.rangeForm.value.start, this.rangeForm.value.end).subscribe(data => {
      this.isLoading = false;
      this.dataSource = data;
      this.tAmount = 0
      this.dataSource.forEach(e => {
        this.tAmount += e.amount
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
    let sheetName = name || "ExpensesReports";
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
          name: x.name,
          amount: x.amount,
          expensestype: x.expensestype.type,
          paymentMode: x.paymentMode.paymentMode,
          employee: x.employee == null ? '' : x.employee.username,
          createdBy: x.createdBy.username,
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
      XLSX.writeFile(workBook, `ExpensesReports.xlsx`);
    }
  }
}
