import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeRoleService } from 'src/app/shared/services/employee-role.service';
import { ButtonRendererComponent } from '../../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../../delete-button-renderer/delete-button-renderer.component';
import { AddEmployeeRoleComponent } from './add-employee-role/add-employee-role.component';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.scss']
})
export class EmployeeRoleComponent implements OnInit {

  columnDefs=[
    { field: "id"},
    {field:"role",},
    {field:"description"},
    {field:"status"}, 
  {
    headerName: 'Actions',
    cellRenderer: 'buttonRenderer',
    cellRendererParams: {
      onClick: this.onEditButtonClick.bind(this),
      label: 'Edit',
    
    // cellRenderer: 'buttonRenderer',
    // cellRendererParams: {
    //   onClick: this.onDeleteButtonClick.bind(this),
    //   label: 'delete',
    //},
  },
   
  }
  // {
  //   headerName: 'Actions',
  //   cellRenderer: 'buttonRenderer1',
  //   cellRendererParams: {
  //     onClick: this.onDeleteButtonClick.bind(this),
  //     label: 'delete',
  //   },
  //   },

  ];
  displayedColumns: string[] = [
    'id',
    'role',
    'description',
    'status',
    // 'actions',
  ];

  isLoading!: boolean;
  data: any;
  id!: number;
  dataSource: any;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  totalLength = [10, 25, 50, 100];
  empRoleForm: any;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog: MatDialogRef<AddEmployeeRoleComponent> | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  api: any;
  frameworkComponents: { buttonRenderer: any,deleteButtonRenderer1: any};
  defaultColDef: { resizable: boolean; sortable: boolean; };
  constructor(
    private employeeRoleservice: EmployeeRoleService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
    ) {   this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      deleteButtonRenderer1:DeleteButtonRendererComponent
    };
    this.defaultColDef = { resizable: true,sortable: true}
    }
  ngOnInit(): void {
    this.ReadEmployeeRoleDetails();
  }

  openDialog() {
    const id = undefined;
    this.employeeRoleservice.setter(id);
    this.simpleDialog = this.dialog.open(AddEmployeeRoleComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.employeeRoleservice.onSelectRoles.next([]);
      this.ReadEmployeeRoleDetails();
    });
  }

  ReadEmployeeRoleDetails() {
    this.employeeRoleservice.getEmployeeRole().subscribe(data => {
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
    console.log(params.data.id,"id");
    
    this.employeeRoleservice.setter(params.data.id);
    this.simpleDialog = this.dialog.open(AddEmployeeRoleComponent, {
      width: '25%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.employeeRoleservice.onSelectRoles.next([]);
      this.ReadEmployeeRoleDetails();
    });
  }
  onDeleteButtonClick(params) {
  console.log(params.data.id,"///");
   this.id=params.data.id
//  this.api.updateRowData({remove: [params.data]});
  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.employeeRoleservice.deleteEmployeeRole(this.id).subscribe(data => {
        console.log(data);
        
        this.ReadEmployeeRoleDetails();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    }
    else {
      status = false;
    }
    this.empRoleForm = {
      status,
    };
    this.employeeRoleservice.updateEmployeeRole(id, this.empRoleForm).subscribe(data => {
      console.log(data);
      this.ReadEmployeeRoleDetails();
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  updateRoles(empRoleId: any) {
    this.employeeRoleservice.setter(empRoleId);
    this.simpleDialog = this.dialog.open(AddEmployeeRoleComponent, {
      width: '25%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.employeeRoleservice.onSelectRoles.next([]);
      this.ReadEmployeeRoleDetails();
    });
  }

  deleteRoles(empRoleId: any) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.employeeRoleservice.deleteEmployeeRole(empRoleId).subscribe(data => {
        this.ReadEmployeeRoleDetails();
        this.snackbar.open('Role Deleted', 'Ok', {
          duration: 2000,
        });
      });
    }
  }

}
