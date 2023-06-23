import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SupplierModel } from 'src/app/shared/models/supplier.model';
import { SuppliersService } from 'src/app/shared/services/suppliers.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  url = environment.root;
  dataSource: any;
  isLoading!: boolean;
  totalLength = [5,10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  usersForm: any;
  supplierData: SupplierModel[] | any;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  displayedColumns: string[] = [
    'id',
    'uniqueId',
    'image',
    'name',
    'shortName',
    'contactPerson',
    'mobileNumber',
    'email',
    'address',
    'actions',
  ];
  columnDefs=[
    { field: "id",width:100},
    {field:"user.uniqueId",headerName:'UniqueId'},
    {field:"url+ '/'+element.user.image",headerName:'Image'},
    {field:"user.fullName",headerName:'Name'},
    {field:"shortName"},
    {field:"contactPerson"},
    {field:"user.mobile",headerName:'MobileNumber'},
    {field:"user.email",headerName:'Email'},
    {field:"address"},

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
    // },
  },
   
  },
  {
    headerName: 'Actions',
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
  defaultColDef: { resizable: boolean; sortable: boolean;filter:boolean };
  api: any;
  constructor(
    private suppliersService: SuppliersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {this.frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
    deleteButtonRenderer:DeleteButtonRendererComponent
  };
  this.defaultColDef = { resizable: true,sortable: true,filter:true} }

  ngOnInit(): void {
    this.getSuppliers();
    this.isLoading = true;
  }

  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe(data => {
      this.supplierData = data;
      console.log(this.supplierData);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.supplierData);
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
    this.router.navigate([`admin/suppliers/${params.data.id}/edit`]);
  }
  onDeleteButtonClick(params) {

  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.suppliersService.deleteSuppliers(params.data.id,).subscribe(data => {
        console.log(data);
        
        this.getSuppliers();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  getFileName = (name: string) => {
    const timeSpan = new Date().toISOString();
    const sheetName = name || 'SuppliersData';
    const fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  }

  exportTable() {
    if (this.dataSource.filteredData.length === 0) {
      alert('No data available for ExportData');
    }
    else {
    const dataToExport = this.dataSource.filteredData
      .map(x => ({
        UniqueId: x.user.uniqueId,
        Name: x.shortName,
        ContactPerson : x.contactPerson,
        MobileNumber : x.user.mobile,
        EmailId : x.user.email,
        Address: x.address
      }));

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport,  { sheet: 'Sheet 1' } as XLSX.Table2SheetOpts);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();

    let wscols = [
      { wch: 10 }
    ];

    workSheet['!cols'] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook, `SuppliersData.xlsx`);
  }
}


  downloadPDF() {
    if (this.dataSource.filteredData.length === 0) {
      alert('No data available for ExportData');
    }
    else {
    let prepare = [];
    this.supplierData.forEach((e) => {
      let tempObj = [];
      tempObj.push(e.user.uniqueId);
      tempObj.push(e.shortName);
      tempObj.push(e.contactPerson);
      tempObj.push(e.user.mobile);
      tempObj.push(e.user.email);
      tempObj.push(e.address);
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [
        [
        'UniqueId',
        'Name',
        'ContactPerson',
        'MobileNumber',
        'EmailId ',
        'Address'],
      ],
      body: prepare,
    });
    doc.save('SuppliersData.pdf');
  }
}


  DeleteSuppliers(user: number) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
    this.suppliersService.deleteSuppliers(user).subscribe(data => {
      this.getSuppliers();
      this.snackbar.open('Deleted Successfully', 'Ok', {
        duration: 2000,
      });
    });
  }
}

  UpdateSuppliers(user: any) {
    this.router.navigate([`admin/suppliers/${user}/edit`]);
  }

  async changeStatus(id: number, status: boolean) {

    if (status === false) {
      status = true;
    }
    else {
      status = false;
    }
    this.usersForm = {
      status,
    };
    this.suppliersService.updateSuppliers(id, this.usersForm).subscribe(data => {
      this.getSuppliers();
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

}
