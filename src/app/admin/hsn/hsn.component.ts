import { HsnService } from './../../shared/services/hsn.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AddHSNComponent } from './add-hsn/add-hsn.component';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';

@Component({
  selector: 'app-hsn',
  templateUrl: './hsn.component.html',
  styleUrls: ['./hsn.component.scss']
})
export class HSNComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'code',
    'type',
    'gst',
    'gst2',
// 'description',
    'status',
    'actions',
  ];
  columnDefs=[
    { field: "id",width:80},
    {field:"code",width:130},
    {field:"hsnType.type",headerName:'Type',width:130},
    {field:"gst",width:120},
    {field:"gst2",width:120},
    {field:"address",width:120},
    {field:"status",width:120},

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
    headerName: '',width:110,
    cellRenderer: 'deleteButtonRenderer',
    cellRendererParams: {
      onClick: this.onDeleteButtonClick.bind(this),
      label: 'delete',
    },
    },

  ];
  isLoading!: boolean;
  hsnData: any;
  hsnForm: any;
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
  simpleDialog: MatDialogRef<AddHSNComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  updated: number;
  api: any;
  defaultColDef: { resizable: boolean; sortable: boolean;filter: boolean };

  frameworkComponents: { buttonRenderer: typeof ButtonRendererComponent; deleteButtonRenderer: typeof DeleteButtonRendererComponent; };

  constructor(private hsnService: HsnService,
              public dialog: MatDialog,
              private snackbar: MatSnackBar) { this.frameworkComponents = {
                buttonRenderer: ButtonRendererComponent,
                deleteButtonRenderer:DeleteButtonRendererComponent
              };
              this.defaultColDef = { resizable: true,sortable: true,filter:true} }

  ngOnInit(): void {
    this.updated = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.ReadHSNDetails();
  }
  openDialog() {
    const id = undefined;
    this.hsnService.setter(id);
    this.simpleDialog = this.dialog.open(AddHSNComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.hsnService.onSelectHSN.next([]);
      this.ReadHSNDetails();
    });
  }
  ReadHSNDetails() {
    this.hsnService.getHSN().subscribe(data => {
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
  onEditButtonClick(params) {
    this.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'make',
      
    });
    this.hsnService.setter(params.data.id);
    this.simpleDialog = this.dialog.open(AddHSNComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.hsnService.onSelectHSN.next([]);
      this.ReadHSNDetails();
    });
  }
  onDeleteButtonClick(params) {
  if (confirm("Are you sure! You want to delete this record?") === true) {
    this.hsnService.deleteHSN(params.data.id).subscribe(data => {
        console.log(data);
        
        this.ReadHSNDetails();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}


  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  updateHSNData(hsn: any) {
    this.hsnService.setter(hsn);
    this.simpleDialog = this.dialog.open(AddHSNComponent, {
      width: '27%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.hsnService.onSelectHSN.next([]);
      this.ReadHSNDetails();
    });
  }

  async changeStatus(id: number, status: boolean) {
      if (status === false) {
        status = true;
      }
      else {
        status = false;
      }
      const Form = {
        status,
        updated:this.updated
      };
      this.hsnService.updateHSN(id, Form).subscribe(data => {
        this.ReadHSNDetails();
      });
  }

  deleteHSNData(hsn: any) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
      this.hsnService.deleteHSN(hsn).subscribe(data => {
        this.ReadHSNDetails();
        this.snackbar.open('HSN Deleted', 'Ok', {
          duration: 2000,
        });
      });
    }
  }
}
