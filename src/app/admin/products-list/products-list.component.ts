import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MedicineModel } from 'src/app/shared/models/products.model';
import { InventoryMedicinesService } from 'src/app/shared/services/products.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { number } from '@amcharts/amcharts4/core';
import { ProductListService } from 'src/app/shared/services/product-list.service';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  dataSource: any;
  isLoading!: boolean;
  totalLength = [5, 10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  Form: any;
  product: any;
  productData: any;
  pId: number;
  Data: any;
  productForm: FormGroup;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png',
  };
  productList: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'shortName',
    'unitPacking',
    'date',
    'actions',
  ];
  columnDefs=[
    { field: "id",width:100},
    {field:"name"},
    {field:"shortName"},
    {field:"packing",
    headerName:'Packing', valueGetter: 
      function (params) { return params.data.packing + '*' +     params.data.units } 
    },
    // {field:"unitPacking"},
    {field:"date"},
    {field:"status"},

  {
    headerName: 'Actions',
    cellRenderer: 'deleteButtonRenderer',
    cellRendererParams: {
      onClick: this.onDeleteButtonClick.bind(this),
      label: 'delete',
    },
  },
   
 
  // {
  //   headerName: 'Actions',
  //   cellRenderer: 'deleteButtonRenderer',
  //   cellRendererParams: {
  //     onClick: this.onDeleteButtonClick.bind(this),
  //     label: 'delete',
  //   },
  //   },

  ];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  updatedId: number;
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean; };
  api: any;
  constructor(
    private medicinesService: InventoryMedicinesService,
    private productService: ProductListService,
    private snackBar: MatSnackBar,
    private router: Router
  ) 
    {  this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      deleteButtonRenderer:DeleteButtonRendererComponent
    };
    this.defaultColDef = { resizable: true,sortable: true}
  }

  ngOnInit(): void {
    this.updatedId = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.medicinesService.getMedicines().subscribe((data) => {
      this.product = data;
      this.productData = data;
      console.log(this.productData);
      this.productData = new MatTableDataSource(this.productData);
    });
    this.getproductsList();

    this.productForm = new FormGroup({
      productId: new FormControl('', Validators.required),
    });
  }
  ProductFilter(event: any) {
    this.productData.filter = event.target.value.trim().toLowerCase();
    this.product = this.productData.filteredData;
  }

  productId(id: number) {
    this.pId = id;
    this.productForm.value.productId = this.pId;
    console.log(this.pId);
  }
  addProduct() {
    this.productService.addproduct(this.productForm.value).subscribe((data) => {
      this.productList = data;
      if (data) {
        this.snackBar.open('Product Successfully Added!', 'Success', {
          duration: 2000,
        });
        this.getproductsList();
        this.productForm.reset();
        this.router.navigate(['/admin/product-list']);
      }
    });
  }
 
  getproductsList() {
    this.productService.getProduct().subscribe((data) => {
      this.isLoading = false;
      this.productList = data;
      console.log(this.productList);
      this.Data= this.productList.productsList;
      console.log(this.Data);
      this.dataSource = new MatTableDataSource(this.Data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }
  onRowEditingStopped(params) {
    debugger;
  }
  onGridReady(params) {
    this.api = params.api;
  }
  onDeleteButtonClick(params) {
 
  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.productService.deleteProduct(params.data.id).subscribe(data => {
        this.getproductsList();
        this.snackBar.open('One Record Successfully Deleted ', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  DeleteMedicine(user: number) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
      this.productService.deleteProduct(user).subscribe((data) => {
        this.getproductsList();
        this.snackBar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
  }

}
