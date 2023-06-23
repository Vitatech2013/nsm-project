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
import { BatchService } from 'src/app/shared/services/batch.service';


@Component({
  selector: 'app-purchase-items-reports',
  templateUrl: './purchase-items-reports.component.html',
  styleUrls: ['./purchase-items-reports.component.scss'],
  providers: [DatePipe]
})
export class PurchaseItemsReportsComponent implements OnInit {

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
    'name',
    'purPrice',
    'quantity',
    'discount',
    'gstValue',
    'totalAmount'
  ];
  columnDefs=[
    {field: "id",width:100},
    {field:"createdAt",},
    {field:"name"},
    {field:"purPrice"},
    {field:"quantity"},
    {field:"discount"},
    {field:"gstValue"},
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
    private purchaseItemsService: BatchService,
    public datepipe: DatePipe
  ) {  this.defaultColDef = { resizable: true,sortable: true}}

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

    this.purchaseItemsService.getpurchaseItemsReports(start, end).subscribe((data) => {
      this.orderItems = data;
      this.orderItems.map(item => {
        const data = {
          createdAt: item.createdAt,
          name: item.name,
          purPrice: item.purPrice,
          quantity: item.quantity,
          gstValue: item.gstValue,
          discount: item.disAmount,
          totalAmount: parseInt(item.totalAmount)
        };
        for (const item of array){
          if (item.name === data.name){
              item.quantity += data.quantity,
              item.totalAmount += data.totalAmount;
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
    this.purchaseItemsService.getpurchaseItemsReports(start, end).subscribe((data) => {
      this.orderItems = data;
      this.orderItems.map(item => {
        const data = {
          createdAt: item.createdAt,
          name: item.name,
          purPrice: item.purPrice,
          quantity: item.quantity,
          gstValue: item.gstValue,
          discount: item.disAmount,
          totalAmount: parseInt(item.totalAmount)
        };
        for (const item of array){
          if (item.name === data.name){
              item.quantity += data.quantity,
              item.totalAmount += data.totalAmount;
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
