import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { NewPaymentTypeComponent } from './new-payment-type/new-payment-type.component';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'paymentType',
    'description',
    'createdAt',
    'status',
    'actions',
  ];
  columnDefs=[
    { field: "id",width:80},
    {field:"paymentType",width:160},
    {field:"description",width:160},
    {field:"createdAt",width:210},
     {field:"status",width:150},
  {
    headerName: 'Actions',width:110,
    cellRenderer: 'buttonRenderer',
    cellRendererParams: {
      onClick: this.onEditButtonClick.bind(this),
      label: 'Edit',
    
    // cellRenderer: 'deleteButtonRenderer',
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
    }
//    { headerName: 'Action',   cellRenderer: (data) => {
    
//     console.log(data,"aaa")
//     console.log(data.data.id,"aaa")

//     if (data) 
//     {
      
//       return  '<div>' +
//       '<a (click)="updatePaymentTypeData("${data.data.id}")">Edit</a>'+
//       '</div>'
// // '<button (click)="updatePaymentTypeData(data.data.id)">edit</button>' +'<button (click)="deletePaymentTypeData(data.id)"> delete</button>
//     //    '<mat-icon class="view" color="primary" class="action-link" matTooltip="View" (click)="updatePaymentTypeData(paymentType.id)">mode</mat-icon>'
     
//     //    +
//     // '<mat-icon class="view" color="warn" class="action-link" matTooltip="Delete" (click)="deletePaymentTypeData(paymentType.id)">delete</mat-icon>
//     }      
//     else
//     {
//         return '<span style="color:blue;font-weight:bold">blue</span>';
//     }
//     }
// }
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
  simpleDialog: MatDialogRef<NewPaymentTypeComponent> | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  paymentTypeForm: any;
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean;filter: boolean };

  api: any;
  constructor(private paymentTypeService: PaymentTypeService,
              public dialog: MatDialog,
              private snackbar: MatSnackBar, ) { 
                this.frameworkComponents = {
                  buttonRenderer: ButtonRendererComponent,
                  deleteButtonRenderer:DeleteButtonRendererComponent
                };
                this.defaultColDef = { resizable: true,sortable: true,filter:true}
              }
  ngOnInit(): void {
    this.ReadPaymentTypeDetails();
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
    this.paymentTypeService.setter(params.data.id);
    this.simpleDialog = this.dialog.open(NewPaymentTypeComponent, {
      width: '35%'
   });
   this.simpleDialog.afterClosed().subscribe(res => {
     this.paymentTypeService.onSelectRoles.next([]);
     this.ReadPaymentTypeDetails();
   });
  }
  onDeleteButtonClick(params) {
  if (confirm("Are you sure! You want to delete this record?") === true) {
    this.paymentTypeService.deletePaymentType(params.data.id).subscribe(data => {
        console.log(data);
        this.ReadPaymentTypeDetails();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
  }
  openDialog() {
    const id = undefined;
    this.paymentTypeService.setter(id);
    this.simpleDialog = this.dialog.open(NewPaymentTypeComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.paymentTypeService.onSelectRoles.next([]);
      this.ReadPaymentTypeDetails();
    });
  }
  ReadPaymentTypeDetails() {
    this.paymentTypeService.getPaymentType().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }
  async changeStatus(id: number, status: boolean) {
    if (status === false){
      status = true;
    }
    else{
      status = false;
    }
    this.paymentTypeForm = {
      status
    };
    this.paymentTypeService.updatePaymentType(id, this.paymentTypeForm).subscribe(data => {
      this.ReadPaymentTypeDetails();
    });
  }
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  updatePaymentTypeData(paymnetType: any) {
    this.paymentTypeService.setter(paymnetType);
    this.simpleDialog = this.dialog.open(NewPaymentTypeComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.paymentTypeService.onSelectRoles.next([]);
      this.ReadPaymentTypeDetails();
    });
  }

  deletePaymentTypeData(paymnetType: any) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
    this.paymentTypeService.deletePaymentType(paymnetType).subscribe(data => {
      this.ReadPaymentTypeDetails();
      this.snackbar.open('PaymentType Deleted', 'Ok', {
        duration: 2000,
      });
    });
  }
}

}
