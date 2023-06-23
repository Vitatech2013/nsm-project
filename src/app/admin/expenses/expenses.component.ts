import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { NewExpensesComponent } from './new-expenses/new-expenses.component';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import * as moment from 'moment';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'name',
    'amount',
    'expenseTypeId',
    'paymentTypeId',
    'description',
    'actions',
  ];
   
  columnDefs=[
    { field: "id",width:80},
    {field:"date",
    cellRenderer: (data) => {
    
      return moment(data.value).format('MM/DD/YYYY HH:mm a')
 }
},
    {field:"name",width:110},
    {field:"amount",width:110},
    {field:"expenseType.expenseType",headerName: 'ExpenseType',width:150},
    {field:"paymentType.paymentType",headerName: 'PaymentType',width:150},
    {field:"description",width:150},
   
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
    headerName: '',width:100,
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
  expensesData: any;
  totalLength = [5,10, 25, 50, 100];
  filterData=[];
  data1:boolean;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog!: MatDialogRef<NewExpensesComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expensesForm: any;
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean;filter:boolean; };
  api: any;
  numberOfRows: any;
  constructor(private expensesService: ExpensesService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,) { 
      this.frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
        deleteButtonRenderer:DeleteButtonRendererComponent
      };
      this.defaultColDef = { resizable: true,sortable: true,filter: true}
    }


  ngOnInit(): void {
    this.ReadExpensesDetails();
    this.data1=false;
  }
  onFilterChanged(params) {
    console.log(params.columns[0].colDef.headerName)
    if(params.columns[0].colDef.headerName==="ExpenseType"){
     console.log(this.numberOfRows = params.api?.getDisplayedRowCount());
    this.filterData=[];
    params.api.forEachNodeAfterFilter(node => {
      console.log(node.data);
      this.filterData.push(node.data);
      console.log(this.filterData);
      this.data1=true;
     

  });
}
else{
  this.filterData=[];
}
 
}
  
  getAmount() {
    return this.filterData.reduce((accum, curr) => accum + parseInt(curr.amount), 0);
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
    this.expensesService.setter(params.data.id);
    this.simpleDialog = this.dialog.open(NewExpensesComponent, {
      width: '35%'
   });
   this.simpleDialog.afterClosed().subscribe(res => {
     this.expensesService.onSelectRoles.next([]);
     this.ReadExpensesDetails();
   });
  }
  onDeleteButtonClick(params) {
  if (confirm("Are you sure! You want to delete this record?") === true) {
    this.expensesService.deleteExpenses(params.data.id).subscribe(data => {
        console.log(data);
        
        this.ReadExpensesDetails();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
  }
  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "ExpensesData";
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
        Name: x.name,
        UserName: x.user.fullName,
        ExpensesType: x.expenseType.expenseType,
        Amount: x.amount,
        PaymentType: x.paymentType.paymentType,
        Date : x.date,
        Description: x.description,
      }));

    let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
    let workBook: XLSX.WorkBook = XLSX.utils.book_new();

    // Adjust column width
    var wscols = [
      { wch: 15}
    ];

    workSheet["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook, `ExpensesData.xlsx`);
  }
}

  downloadPDF() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
    var prepare = [];
    this.expensesData.forEach((e) => {
      var tempObj = [];
      tempObj.push(e.name);
      tempObj.push(e.user.fullName);
      tempObj.push(e.expenseType.expenseType);
      tempObj.push(e.amount);
      tempObj.push(e.paymentType.paymentType);
      tempObj.push(e.date);
      tempObj.push(e.description);
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [
        [
          'Name',
          'UserName',
          'ExpensesType',
          'Amount',
          'PaymentType',
          'Date',
          'Description',
        ],
      ],
      body: prepare,
    });
    doc.save('ExpensesData.pdf');
  }
}

  openDialog() {
    const id = undefined;
    this.expensesService.setter(id);
    this.simpleDialog = this.dialog.open(NewExpensesComponent, {
      width: '35%'
   });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.expensesService.onSelectRoles.next([]);
      this.ReadExpensesDetails();
    });
  }

  ReadExpensesDetails() {
    this.expensesService.getExpenses().subscribe(data => {
      console.log(data);
      this.expensesData = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.expensesData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
       this.total = this.dataSource.data.length;

    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  // async changeStatus(id: number, exStatus: boolean) {
  //   if (exStatus === false){
  //     exStatus = true;
  //   }
  //   else{
  //     exStatus = false;
  //   }
  //   this.expensesForm = {
  //     exStatus,
  //   };
  //   this.expensesService.updateExpenses(id, this.expensesForm).subscribe(data => {
  //     console.log(data);
  //     this.ReadExpensesDetails();
  //   });
  // }

  updateexpenses(exId: any) {
    this.expensesService.setter(exId);
    this.simpleDialog = this.dialog.open(NewExpensesComponent, {
       width: '35%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.expensesService.onSelectRoles.next([]);
      this.ReadExpensesDetails();
    });
  }

  deleteexpenses(exId: any) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
    this.expensesService.deleteExpenses(exId).subscribe(data => {
      this.snackbar.open('Expenses Deleted', 'Ok', {
        duration: 2000,
      });
      this.ReadExpensesDetails();
    });
  }
}
}
