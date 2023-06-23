import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import * as moment from 'moment';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';

@Component({
  selector: 'app-sale-items-reports',
  templateUrl: './sale-items-reports.component.html',
  styleUrls: ['./sale-items-reports.component.scss'],
  providers: [DatePipe]
})
export class SaleItemsReportsComponent implements OnInit {

  Url = environment.root;
  isLoading: boolean;
  id: number;
  dataSource;
  orderItems: any;
  itemsData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'sno',
    'createdAt',
    'batchNumber',
    'name',
    'purPrice',
    'quantity',
    'gstValue',
    'discount',
    'netAmount',
    'totalAmount'
  ];
  columnDefs=[
    {field: "id",width:100},
    {field:"createdAt",},
    {field:"batchNumber"},
    {field:"name"},
    {field:"purPrice"},
    {field:"quantity"},
    {field:"gstValue"},
    {field:"discount"},
    {field:"netAmount"},
    {field:"totalAmount"},
  ];
  tAmount: number;
  quantity: number;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  itemForm;
  rangeForm = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl()
  });
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  defaultColDef: { resizable: boolean; sortable: boolean; };
  api: any;

  constructor(
    private salesItemsService: SalesItemsService,
    public datepipe: DatePipe
  ) { this.defaultColDef = { resizable: true,sortable: true} }

  ngOnInit() {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.loadData();
  }
  onGridReady(params) {
    this.api = params.api;
  }
  async loadData() {
    if (this.rangeForm.value.end == null) {
      this.rangeForm.value.end = this.rangeForm.value.start;
    }
    let array = [];
    let added = false;

    const c = new Date(this.rangeForm.value.start);
    const d = new Date(this.rangeForm.value.end);
    const start = moment(c).format('YYYY-MM-DD');
    const end = moment(d).format('YYYY-MM-DD');

    this.salesItemsService.getSaleItemsReports(start, end).subscribe((data) => {
      console.log(data);
      this.orderItems = data;
      this.orderItems.map(item => {
        const data = {
          createdAt: item.createdAt,
          batchNumber: item.batch.batchNumber,
          name: item.batch.name,
          purPrice: item.batch.purPrice,
          quantity: item.quantity,
          gstValue: item.gstAmount,
          discount: item.disAmount,
          netAmount: item.netAmount,
          totalAmount: item.totalAmount
        };
        for (const item of array){
          if (item.name === data.name && item.batchNumber === data.batchNumber){
              item.quantity += data.quantity,
              item.totalAmount += data.totalAmount,
              item.netAmount += data.netAmount,
              item.disAmount += data.discount,
              item.gstAmount += data.gstValue;
              added = true;
              break;
          }
        }
        if (!added){
           array.push(data);
        }
        added = false;
      });
      this.tAmount = 0;
      this.quantity = 0;
      array.forEach(e => {
        this.quantity += e.quantity;
        this.tAmount += e.amount;
      });
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(array);
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
    });
  }
  async itemReports() {
    const c = new Date(this.rangeForm.value.start);
    const d = new Date(this.rangeForm.value.end);
    const start = moment(c).format('YYYY-MM-DD');
    let end = moment(d).format('YYYY-MM-DD');
    if (end == null) {
      end = start;
    }
    let array = [];
    let added = false;
    this.salesItemsService.getSaleItemsReports(start, end).subscribe((data) => {
      console.log(data);
      this.orderItems = data;
      this.orderItems.map(item => {
        const data = {
          createdAt: item.createdAt,
          batchNumber: item.batch.batchNumber,
          name: item.batch.name,
          purPrice: item.batch.purPrice,
          quantity: item.quantity,
          gstValue: item.gstAmount,
          discount: item.disAmount,
          netAmount: parseInt(item.netAmount),
          totalAmount: item.totalAmount
        };
        for (const item of array){
          console.log(item.name, data.name, item.batchNumber, data.batchNumber);
          if (item.name === data.name && item.batchNumber === data.batchNumber){
              item.quantity += data.quantity,
              item.totalAmount += data.totalAmount,
              item.netAmount += data.netAmount,
              item.disAmount += data.discount,
              item.gstAmount += data.gstValue;
              added = true;
              break;
          }
        }
        if (!added){
           array.push(data);
        }
        added = false;
      });
      this.tAmount = 0;
      this.quantity = 0;
      array.forEach(e => {
        this.quantity += e.quantity;
        this.tAmount += e.amount;
      });
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(array);
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
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFileName = (name: string) => {
    const timeSpan = new Date().toISOString();
    const sheetName = name || 'CategoryReports';
    const fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  }

  exportTable() {
    if (this.dataSource.filteredData.length === 0) {
      alert('No data available for ExportData');
    }
    else {
    const dataToExport = this.dataSource.filteredData
      .map(x => ({
          expenseType: x.expenseType.expenseType,
          name: x.name,
          paymentType: x.paymentType.paymentType,
          amount: x.amount,
          description: x.description,
          createdAt: this.datepipe.transform(x.createdAt, 'yyyy-MM-dd'),

      }));

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport,  { sheet: 'Sheet 1' } as XLSX.Table2SheetOpts);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();

    // Adjust column width
    let wscols = [
      { wch: 15 }
    ];

    workSheet['!cols'] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook, `CategoryReports.xlsx`);
  }
  }

}
