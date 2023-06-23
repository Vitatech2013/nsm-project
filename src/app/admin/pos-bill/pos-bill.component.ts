import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PosBillService } from 'src/app/shared/services/pos-bill.service';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { BillFormattComponent } from '../pos-bill/bill-formatt/bill-formatt.component';

@Component({
  selector: 'app-pos-bill',
  templateUrl: './pos-bill.component.html',
  styleUrls: ['./pos-bill.component.scss']
})
export class PosBillComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'invoiceNum',
    'mobile',
    'amount',
    'itemDisAmount',
    'afterDisAmount',
    'taxAmount',
    'totalAmount',
    'discountType',
    'discount',
    'disAmount',
    'netAmount',
    'actions',
  ];
  columnDefs=[
    { field: "id",width:70},
    {field:"name",width:120},
    {field:"invoiceNum", headerName:"invoiceNum",width:130,
    // cellRendererParams: {
    //   cellClicked: this.onCellClicked.bind(this)},
    
  
},
   
  
    {field:"mobile",width:120},
    {field:"amount",width:110},
    {field:"itemDisAmount",width:160},
    // {field:"afterDisAmount",},
    // {field:"taxAmount",},
    // {field:"totalAmount",},
    // {field:"discountType",},
    // {field:"discount",},
    {field:"disAmount",width:130},
    {field:"netAmount",width:130},

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
  // {
  //   headerName: 'Actions',
  //   cellRenderer: 'buttonRenderer1',
  //   cellRendererParams: {
  //     onClick: this.onDeleteButtonClick.bind(this),
  //     label: 'delete',
  //   },
  //   },

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
  simpleDialog: MatDialogRef<BillFormattComponent> | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  posBillForm: any;
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean;filter:boolean };
  api: any;
   rowSelection:any
  gridApi: any;
  constructor(private posBillService: PosBillService,
    private router: Router, 
    private snackbar: MatSnackBar, public dialog: MatDialog,) {this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      deleteButtonRenderer:DeleteButtonRendererComponent
    };
    this.defaultColDef = { resizable: true,sortable: true,filter: true}
    this.rowSelection = 'single';
    } 

  ngOnInit(): void {
    this.ReadPosBillDetails();
  }

  ReadPosBillDetails() {
    this.posBillService.getSales().subscribe(data => {
      console.log(data);
      
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
  onCellClicked(event){

console.log("////",event);
console.log(event.colDef.headerName)
if(event.colDef.headerName==="invoiceNum"){
const selectedRows = this.api.getSelectedRows();
console.log(selectedRows);
console.log(
  selectedRows.length === 1 ? selectedRows[0].invoiceNum : '')
  const id = undefined;
  this.posBillService.setter(selectedRows[0].id);
  this.simpleDialog = this.dialog.open(BillFormattComponent, {
    width: '27%'
  });
  this.simpleDialog.afterClosed().subscribe(res => {
    this.posBillService.onSelectRoles.next([]);
    this.ReadPosBillDetails();
  });
  }
  else{
  
  }
}

  onEditButtonClick(params) {
    this.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'make',
      
    });
    console.log(params.data.id,"id");
    this.router.navigate([`admin/SalesDemo/${params.data.id}/edit`]);
    
  }
  onSelectionChanged(event) {
   console.log(event)
    const selectedRows = this.api.getSelectedRows();
    console.log(selectedRows);
    console.log(
      selectedRows.length === 1 ? selectedRows[0].invoiceNum : '')
      const id = undefined;
      this.posBillService.setter(selectedRows[0].id);
      this.simpleDialog = this.dialog.open(BillFormattComponent, {
        width: '27%'
      });
      this.simpleDialog.afterClosed().subscribe(res => {
        this.posBillService.onSelectRoles.next([]);
        this.ReadPosBillDetails();
      });
  }
   onEditClick(params) {
    this.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'make',
      
    });
    console.log(params.data.id,"id");
    this.router.navigate([`admin/SalesDemo/${params.data.id}/edit`]);
    
  }
  onDeleteButtonClick(params) {
  console.log(params.data.id,"///");
   this.id=params.data.id
//  this.api.updateRowData({remove: [params.data]});
  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.posBillService.deleteSales(this.id).subscribe(data => {
        console.log(data);
        
        this.ReadPosBillDetails();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  
  async changeStatus(id: number, status: boolean) {
    
    if (status === false){
      status = true;
    }
    else{
      status = false;
    }
    this.posBillForm = {
      status,
     
    };
    this.posBillService.updateSales(id, this.posBillForm).subscribe(data => {
      this.ReadPosBillDetails();
    });
  }
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  updateData(id:number){
    console.log(id)
    this.router.navigate([`admin/SalesDemo/${id}/edit`]);
  }
  deleteData(bill:any){
    
  }
}
