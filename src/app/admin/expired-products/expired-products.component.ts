import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineCategoryService } from 'src/app/shared/services/medicine-category.service';

@Component({
  selector: 'app-expired-products',
  templateUrl: './expired-products.component.html',
  styleUrls: ['./expired-products.component.scss']
})
export class ExpiredProductsComponent implements OnInit {
  dataSource: MatTableDataSource<unknown>;
  total: number;
  totalLength = [10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  isLoading!: boolean;
  displayedColumns: string[] = [
    'id',
    'category',
    'description',
    'status',
    'actions',
  ];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ExpiredProductsData: any;
  constructor( private medicineCategoryService: MedicineCategoryService,) { }

  ngOnInit(): void {
    this.getExpiredProducts(); 
  }
  getExpiredProducts() {
    this.medicineCategoryService.getCategory().subscribe(data => {
      this.ExpiredProductsData = data;
      this.dataSource = new MatTableDataSource(this.ExpiredProductsData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
