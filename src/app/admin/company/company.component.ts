import { Companymodel } from './../../shared/models/company.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CompanyService } from 'src/app/shared/services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  dataSource: any;
  isLoading!: boolean;
  totalLength = [5,10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  Form: any;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  companyData: Companymodel[] | any;
  displayedColumns: string[] = [
    'id',
    'company',
    'shortName',
    'mobile',
    'email',
    'city',
    'address',
    'status',
    'actions',
  ];
  columnDefs=[
    { field: "id",width:100},
    {field:"company",width:130},
    {field:"shortName",width:120},
    {field:"phone",width:120},
    {field:"email", width:120},
    {field:"city", width:120},
    {field:"address" ,width:120},
    {field:"status",width:120},

  {
    headerName: 'Actions',width:120,
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
  
  defaultColDef: { resizable: boolean; sortable: boolean;filter: boolean };

  api: any;
  frameworkComponents: { buttonRenderer: typeof ButtonRendererComponent; deleteButtonRenderer: typeof DeleteButtonRendererComponent; };

  constructor(
    private companyService: CompanyService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      deleteButtonRenderer:DeleteButtonRendererComponent
    };
    this.defaultColDef = { resizable: true,sortable: true,filter:true}
   }

  ngOnInit(): void {
    this.getCompanyData();
    this.isLoading = true;
  }

   getCompanyData() {
    this.companyService.getCompany().subscribe(data => {
      this.companyData = data;
      console.log(this.companyData);
      
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.companyData);
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
    this.router.navigate([`admin/company/${params.data.id}/edit`]);
  }
  onDeleteButtonClick(params) {
 
  if (confirm("Are you sure! You want to delete this record?") === true) {
    this.companyService.deleteCompany(params.data.id).subscribe(data => {
        console.log(data);
        
        this.getCompanyData();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}

   DeleteCompanyData(company: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
    this.companyService.deleteCompany(company).subscribe(data => {
      this.getCompanyData();
      this.snackbar.open('Deleted Successfully', 'Ok', {
        duration: 2000,
      });
    });
  }
}

   UpdateCompany(company: any) {
    this.router.navigate([`admin/company/${company}/edit`]);
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false){
      status = true;
    }
    else{
      status = false;
    }
    this.Form = {
      status: status,
    };
    this.companyService.updateCompany(id, this.Form).subscribe(data => {
      this.getCompanyData();
    });
  }

  async applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }


}
