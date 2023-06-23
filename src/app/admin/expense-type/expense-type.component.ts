import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpensesTypeModel } from 'src/app/shared/models/expense_type.model';
import { ExpenseTypeService } from 'src/app/shared/services/expense-type.service';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { NewExpenseTypeComponent } from './new-expense-type/new-expense-type.component';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss']
})
export class ExpenseTypeComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'expenseType',
    'description',
    'createdAt',
    'status',
    'actions',
  ];
  columnDefs=[
    { field: "id",width:80},
    {field:"expenseType",},
    {field:"description",},
    {field:"createdAt",},
    {field:"status",},

  {
    headerName: 'Actions',width:100,
    cellRenderer: 'buttonRenderer',
    cellRendererParams: {
      onClick: this.onEditButtonClick.bind(this),
      label: 'Edit',
    
    // cellRenderer: 'buttonRenderer',
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
  isLoading!: boolean;
  data: any;
  id!: number;
  dataSource: any;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  totalLength = [5,10, 25, 50, 100];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog: MatDialogRef<NewExpenseTypeComponent> | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expensesTypeForm: any;
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean;filter: boolean };
  
  api: any;
  constructor(
    private expenseTypeService: ExpenseTypeService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
    ) { 
      this.frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
        deleteButtonRenderer:DeleteButtonRendererComponent
      };
      this.defaultColDef = { resizable: true,sortable: true,filter:true}
    }

  ngOnInit(): void {
    this.ReadExpensesTypeDetails();
  }

  openDialog() {
    const id = undefined;
    this.expenseTypeService.setter(id);
    this.simpleDialog = this.dialog.open(NewExpenseTypeComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.expenseTypeService.onSelectRoles.next([]);
      this.ReadExpensesTypeDetails();
    });
  }

  ReadExpensesTypeDetails() {
    this.expenseTypeService.getExpenseType().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
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
    this.expenseTypeService.setter(params.data.id);
    this.simpleDialog = this.dialog.open(NewExpenseTypeComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.expenseTypeService.onSelectRoles.next([]);
      this.ReadExpensesTypeDetails();
    });
  }
  onDeleteButtonClick(params) {
  if (confirm("Are you sure! You want to delete this record?") === true) {
    this.expenseTypeService.deleteExpenseType(params.data.id).subscribe(data => {
        console.log(data);
        
        this.ReadExpensesTypeDetails();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false){
      status = true;
    }
    else{
      status = false;
    }
    this.expensesTypeForm = {
      status,
    };
    this.expenseTypeService.updateExpenseType(id, this.expensesTypeForm).subscribe(data => {
      this.ReadExpensesTypeDetails();
    });
  }

  updateExpensesData(exType: any) {
    this.expenseTypeService.setter(exType);
    this.simpleDialog = this.dialog.open(NewExpenseTypeComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.expenseTypeService.onSelectRoles.next([]);
      this.ReadExpensesTypeDetails();
    });
  }

  deleteExpensesData(exType: any) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
    this.expenseTypeService.deleteExpenseType(exType).subscribe(data => {
      this.ReadExpensesTypeDetails();
      this.snackbar.open('ExpensesType Deleted', 'Ok', {
        duration: 2000,
      });
    });
  }
}
}
