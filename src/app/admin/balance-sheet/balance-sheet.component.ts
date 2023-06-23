import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddBalanceSheetComponent } from './add-balance-sheet/add-balance-sheet.component';
import { BalanceSheetModel } from 'src/app/shared/models/balance-sheet.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BalanceSheetService } from 'src/app/shared/services/balance-sheet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {
  simpleDialog: MatDialogRef<AddBalanceSheetComponent> | undefined;
  dataSource: any;
  isLoading!: boolean;
  totalLength = [10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  categoryForm: any;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  categoryData: BalanceSheetModel[] | any;
  displayedColumns: string[] = [
    'id',
    'userId',
    'credit',
    'debit',
    'balance',
    'paymentTypeId',
    // 'status',
    'actions'
  ];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private balanceSheetService: BalanceSheetService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getbalanceSheet();
  }

  openDialog() {
    const id = undefined;
    this.balanceSheetService.setter(id);
    this.simpleDialog = this.dialog.open(AddBalanceSheetComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.balanceSheetService.onSelectbalancesheet.next([]);
      this.getbalanceSheet();
    });
  }

  getbalanceSheet() {
    this.balanceSheetService.getBalanceSheet().subscribe(data => {
      this.categoryData = data;
      this.dataSource = new MatTableDataSource(this.categoryData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }

  DeleteCategory(balId: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
    this.balanceSheetService.deleteBalanceSheet(balId).subscribe(data => {
      this.getbalanceSheet();
      this.snackbar.open('Deleted Successfully', 'Ok', {
        duration: 2000,
      });
    });
  }
}

  updateCategory(balId: any) {
    this.balanceSheetService.setter(balId);
    this.simpleDialog = this.dialog.open(AddBalanceSheetComponent, {
      width: '30%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.balanceSheetService.onSelectbalancesheet.next([]);
      this.getbalanceSheet();
    });
  }

  // async changeStatus(id: number, Status: boolean) {

  //   if (Status === false){
  //     Status = true;
  //   }
  //   else{
  //     Status = false;
  //   }
  //   this.categoryForm = {
  //     Status,
  //   };
  //   this.b.updateCategory(id, this.categoryForm).subscribe(data => {
  //     this.getbalanceSheet();
  //   });
  // }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

}