import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PurchaseModel } from 'src/app/shared/models/purchase.model';
import { PurchaseService } from 'src/app/shared/services/purchase.service';

@Component({
  selector: 'app-purchase-batch',
  templateUrl: './purchase-batch.component.html',
  styleUrls: ['./purchase-batch.component.scss']
})
export class PurchaseBatchComponent implements OnInit {


  dataSource: any;
  isLoading!: boolean;
  totalLength = [5,10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  Form: any
  purchaseData: PurchaseModel[] | any
  displayedColumns: string[] = [
    'id',
    'name',
    'amount',
    'itemDisAmount',
    'subTotal',
    'tax',
    'total',
    'discount',
    'dueAmount',
    'paidAmount',
    'netAmount',
    'date',
    // 'status',
    'actions',
  ];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private purchaseService: PurchaseService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPurchase();
    this.isLoading = true;
  }
  getPurchase() {
    this.purchaseService.getPurchase().subscribe(data => {
      this.purchaseData = data
      console.log(this.purchaseData);
      
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.purchaseData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    })
  }
  DeletePurchase(user: number) {
    this.purchaseService.deletePurchase(user).subscribe(data => {
      this.getPurchase();
      this.snackbar.open('Deleted Successfully', 'Ok', {
        duration: 2000,
      });
    });
  }

  UpdatePurchase(user: any) {
    this.router.navigate([`admin/PurchaseBatch/${user}/edit`]);
  }
  async changeStatus(id: number, sStatus: boolean) {
    if (sStatus == false) {
      sStatus = true;
    }
    else {
      sStatus = false;
    }
    this.Form = {
      sStatus,
    };
    this.purchaseService.updatePurchase(id, this.Form).subscribe(data => {
      this.getPurchase();
    });
  }
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }


}
