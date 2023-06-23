import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { environment } from 'src/environments/environment';
import { ButtonRendererComponent } from '../../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../../delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  url = environment.root;
  dataSource: any;
  isLoading!: boolean;
  totalLength = [5,10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  usersForm: any;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  employeeData: EmployeeModel[] | any;
  displayedColumns: string[] = [
    'id',
    'uniqueId',
    'image',
    'role',
    'fullName',
    // 'userName',
    'Mobilenumber',
    // 'bloodGroup',
    'DOB',
    'address',
    'actions',
  ];
  
  columnDefs=[
    { field: "id",width:80},
    {field:"user.uniqueId",headerName:'UniqueId',width:120},
    {field:"url+ '/'+element.user.image",headerName:'Image',width:110},
    {field:"user.role.role",headerName:'Role',width:100},
    {field:"user.fullName",headerName:'FullName',width:140},
    {field:"user.mobile",headerName:'MobileNumber',width:150},
    {field:"dob",width:110},
    {field:"address",width:110},
   

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

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTableExporterDirective, { static: true })
  exporter: MatTableExporterDirective;
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean;filter: boolean };

  api: any;
  constructor(
    private employeeService: EmployeeService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {this.frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
    deleteButtonRenderer:DeleteButtonRendererComponent
  };
  this.defaultColDef = { resizable: true,sortable: true,filter:true}}

  ngOnInit(): void {
    this.getEmployees();
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
    
    this.router.navigate([`admin/employees/${params.data.id}/edit`]);
  }
  onDeleteButtonClick(params) {

  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.employeeService.deleteEmployee(params.data.id,).subscribe(data => {
        console.log(data);
        
        this.getEmployees();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  
   getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "EmployeeData";
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
    let dataToExport = this.dataSource.filteredData
      .map(x => ({
        userId: x.user.uniqueId,
        fullName: x.user.fullName,
        userName: x.userName,
        // bloodGroup: x.bloodGroup,
        dob : x.dob,
        address:x.address,
        status: x.status === 1 ? 'true' : 'false'
      }));

    let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
    let workBook: XLSX.WorkBook = XLSX.utils.book_new();

    // Adjust column width
    var wscols = [
      { wch: 10 },
      { wch: 10 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 20 },
      { wch: 10 }
    ];

    workSheet["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook, `EmployeeData.xlsx`);
  }

  }
  downloadPDF() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
    var prepare = [];
    this.employeeData.forEach((e) => {
      var tempObj = [];
      tempObj.push(e.user.uniqueId);
      tempObj.push(e.user.fullName);
      tempObj.push(e.userName);
      // tempObj.push(e.bloodGroup);
      tempObj.push(e.dob);
      tempObj.push(e.address);
      tempObj.push(e.status === 1 ? 'true' : 'false');
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [
        ['UserId', 'Fullname', 'Username', 'DOB','Address', 'Status'],
      ],
      body: prepare,
    });
    doc.save('EmployeeData.pdf');
  }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employeeData = data;
      console.log(this.employeeData);
      
      this.dataSource = new MatTableDataSource(this.employeeData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }

  DeleteEmployee(user: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
    this.employeeService.deleteEmployee(user).subscribe((data) => {
      this.getEmployees();
      this.snackbar.open('Deleted Successfully', 'Ok', {
        duration: 2000,
      });
    });
  }
}

  UpdateEmployee(user: any) {
    this.router.navigate([`admin/employees/${user}/edit`]);
  }

  async changeStatus(id: number, status: boolean) {
    this.employeeService.getEmployeesById(id).subscribe((data) => {
      this.employeeData = data;
      const rId = this.employeeData.role.rId;
      if (status === false) {
        status = true;
      } else {
        status = false;
      }
      const Form = {
        id,
        status,
      };
      this.employeeService.updateEmployee(id, Form).subscribe((data) => {
        this.getEmployees();
      });
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  ViewAttendanceData(id:number){
    console.log(id);
    this.router.navigate([`admin/attendance/${id}/viewAttendance`]);
  }

}
