import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ItemsService } from '../../services/items.service';
import { OrdersService } from '../../services/orders.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-reports',
  templateUrl: './category-reports.component.html',
  styleUrls: ['./category-reports.component.scss']
})
export class CategoryReportsComponent implements OnInit {

  Url = environment.root;
  isLoading: boolean;
  id: number;
  dataSource;
  orderItems: any
  itemsData: any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'sno',
    'category',
    'priority',
    'price',
  ];
  tAmount:number;
  quantity:number
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

  constructor(
    private itemService: ItemsService,
    private snackbar: MatSnackBar,
    private ordersService: OrdersService,public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.loadData();
  }

  async loadData() {
    if (this.rangeForm.value.end == null) {
      this.rangeForm.value.end = this.rangeForm.value.start
    }
    var array = []
    var added = false

    this.ordersService.OrderItemReports(this.rangeForm.value.start, this.rangeForm.value.end).subscribe((data) => {
      this.orderItems = data;
      this.orderItems.map(item => {
        const data = {
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          amount:item.amount,
          createdAt: item.createdAt
        }
        for(let item of array){
          if(item.category.category === data.category.category){
              item.quantity += data.quantity,
              item.amount += data.amount
              added = true
              break
          }
        }
        if(!added){
           array.push(data)
        }
        added = false
      })
      this.tAmount = 0
      this.quantity = 0
      array.forEach(e=>{
        this.quantity += e.quantity
        this.tAmount += e.amount
      })
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
    if (this.rangeForm.value.end == null) {
      this.rangeForm.value.end = this.rangeForm.value.start
    }
    var array = []
    var added = false
    this.ordersService.OrderItemReports(this.rangeForm.value.start, this.rangeForm.value.end).subscribe((data) => {
      this.orderItems = data;
      this.orderItems.map(item => {
        const data = {
          category: item.category,
          quantity: item.quantity,
          price: item.price,
          amount:item.amount,
          createdAt: item.createdAt
        }
        
        for(let item of array){
          if(item.category.category === data.category.category){
            item.quantity += data.quantity,
            item.amount += data.amount
              added = true
              break
          }
        }
        if(!added){
           array.push(data)
        }
        added = false
      })
      this.tAmount = 0
      this.quantity = 0
      array.forEach(e=>{
        this.quantity += e.quantity
        this.tAmount += e.amount
      })
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
    let timeSpan = new Date().toISOString();
    let sheetName = name || "CategoryReports";
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
        category: x.category.category,
        priority: x.quantity,
        amount:x.amount,
        createdAt:this.datepipe.transform(x.createdAt, 'yyyy-MM-dd'),
       
      }));

    let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
    let workBook: XLSX.WorkBook = XLSX.utils.book_new();

    // Adjust column width
    var wscols = [
      { wch: 15 }
    ];

    workSheet["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook, `CategoryReports.xlsx`);
  }

  }

}
