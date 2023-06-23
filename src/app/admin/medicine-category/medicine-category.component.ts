import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { MedicineCategoryService } from 'src/app/shared/services/medicine-category.service';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { NewMedicineCategoryComponent } from './new-medicine-category/new-medicine-category.component';

@Component({
  selector: 'app-medicine-category',
  templateUrl: './medicine-category.component.html',
  styleUrls: ['./medicine-category.component.scss']
})
export class MedicineCategoryComponent implements OnInit {
  updatedId:number;
  simpleDialog: MatDialogRef<NewMedicineCategoryComponent>;
  dataSource: any;
  isLoading!: boolean;
  totalLength = [5,10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  categoryForm: any;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  categoryData: CategoryModel[] | any;
  displayedColumns: string[] = [
    'id',
    'category',
    'description',
    'status',
    'actions',
  ];
  columnDefs=[
    {field: "id",width:100},
    {field:"category",},
    {field:"description",},
    {field:"status",},

  {
    headerName: 'Actions',width:150,
    cellRenderer: 'buttonRenderer',
    cellRendererParams: {
      onClick: this.onEditButtonClick.bind(this),
      label: 'Edit',
    
    // cellRenderer: 'buttonRenderer1',
    // cellRendererParams: {
    //   onClick: this.onDeleteButtonClick.bind(this),
    //   label: 'delete',
    // },
  },
   
  },
  {
    headerName: '',
    cellRenderer: 'deleteButtonRenderer',
    cellRendererParams: {
      onClick: this.onDeleteButtonClick.bind(this),
      label: 'delete',
    },
    },

  ];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean;filter: boolean };

  api: any;
  constructor(
    private medicineCategoryService: MedicineCategoryService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) {  this.frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
    deleteButtonRenderer:DeleteButtonRendererComponent
  };
  this.defaultColDef = { resizable: true,sortable: true,filter:true}}

  ngOnInit(): void {
    this.updatedId = parseInt(window.localStorage.getItem('id'))
    this.getCategory();
  }

  openDialog() {
    const id = undefined;
    this.medicineCategoryService.setter(id);
    this.simpleDialog = this.dialog.open(NewMedicineCategoryComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.medicineCategoryService.onSelectRoles.next([]);
      this.getCategory();
    });
  }

  getCategory() {
    this.medicineCategoryService.getCategory().subscribe(data => {
      this.categoryData = data;
      this.dataSource = new MatTableDataSource(this.categoryData);
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
  onEditButtonClick(params) {
    this.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'make',
      
    });
    
    this.medicineCategoryService.setter(params.data.id);
    this.simpleDialog = this.dialog.open(NewMedicineCategoryComponent, {
      // width: '30%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.medicineCategoryService.onSelectRoles.next([]);
      this.getCategory();
    });
  }
  onDeleteButtonClick(params) {
 
  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.medicineCategoryService.deleteCategory(params.data.id).subscribe(data => {
        this.getCategory();
        this.snackbar.open('One Record Successfully Deleted ', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  DeleteCategory(user: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
    this.medicineCategoryService.deleteCategory(user).subscribe(data => {
      this.getCategory();
      this.snackbar.open('One Record Successfully Deleted ', 'Ok', {
        duration: 2000,
      });
    });
  }
}

  updateCategory(catId: any) {
    this.medicineCategoryService.setter(catId);
    this.simpleDialog = this.dialog.open(NewMedicineCategoryComponent, {
      // width: '30%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.medicineCategoryService.onSelectRoles.next([]);
      this.getCategory();
    });
  }

  async changeStatus(id: number, status: boolean) {

    if (status === false){
      status = true;
    }
    else{
      status = false;
    }
    this.categoryForm = {
      status,
      updated:this.updatedId
    };
    this.medicineCategoryService.updateCategory(id, this.categoryForm).subscribe(data => {
      this.getCategory();
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

}
