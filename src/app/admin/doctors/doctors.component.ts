import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { environment } from 'src/environments/environment';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  url = environment.root;
  isLoading!: boolean;
  dataSource: any;
  data: any;
  id!: number;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  doctorsForm: any;
  doctorsData: any;
  totalLength = [5,10, 25, 50, 100];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  frameworkComponents: { buttonRenderer: any; deleteButtonRenderer: any; };
  defaultColDef: { resizable: boolean; sortable: boolean;filter: boolean };

  api: any;
  constructor(

    private doctorsService: DoctorsService,
    private router: Router,
    private snackbar: MatSnackBar
  )  {this.frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
    deleteButtonRenderer:DeleteButtonRendererComponent
  };
  this.defaultColDef = { resizable: true,sortable: true,filter:true}
}
  displayedColumns: string[] = [
    'id',
    'uniqueId',
    'image',
    'fullName',
    'mobileNumber',
    'hospital',
    'designation',
    'specialist',
    // 'status',
    'actions'
  ];
  
  
  columnDefs=[
    { field: "id",width:80},
    {field:"user.uniqueId",headerName:'UniqueId',width:120},
    {field:"url+ '/'+element.user.image",headerName:'Image',width:100,cellRenderer: (data) => {
      console.log(data.data.user)
  
      console.log(data.data.user.image)
    let aa=this.url+'/'+data.data.user.image
       console.log(aa);
       
                return ' <img width="100px" height="100px" [src]={{aa}}>';
            }
  },
    {field:"user.fullName",headerName:'FullName',width:120},
    {field:"user.mobile",headerName:'MobileNumber',width:150},
    {field:"hospital",width:110},
    {field:"designation",width:150},
    {field:"specialist",width:120},
  //   { headerName: 'Action',   cellRenderer: (data) => {
  //   console.log(data.data.user)

  //   console.log(data.data.user.image)
  // let aa=this.url+'/'+data.data.user.image
  //    console.log(aa);
     
  //             return ' <img width="100px" height="100px" [src]={{aa}}>';
  //         }
  //         },
  //     //"url+ '/'+ element.user.image" }

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
    headerName: '',width:50,
    cellRenderer: 'deleteButtonRenderer',
    cellRendererParams: {
      onClick: this.onDeleteButtonClick.bind(this),
      label: 'delete',
    },
    },

  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.ReadDoctorsDetails();
    this.isLoading = true;
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
    this.router.navigate([`admin/doctors/${params.data.id}/edit`]);
   
  }
  onDeleteButtonClick(params) {

  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.doctorsService.deleteDoctors(params.data.id,).subscribe(data => {
        console.log(data);
        
        this.ReadDoctorsDetails();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  getFileName = (name: string) => {
    const timeSpan = new Date().toISOString();
    const sheetName = name || 'DoctorsData';
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
        fullName: x.user.fullName,
        hospital: x.hospital,
        gender : x.gender,
        qualification : x.qualification,
        designation : x.designation,
        specialist : x.specialist,
        status: x.status === 1 ? 'true' : 'false'
      }));

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport,  { sheet: 'Sheet 1' } as XLSX.Table2SheetOpts);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();

    let wscols = [
      { wch: 15}
    ];

    workSheet['!cols'] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook, `DoctorsData.xlsx`);
  }
}


  downloadPDF() {
    if (this.dataSource.filteredData.length === 0) {
      alert('No data available for ExportData');
    }
    else {
    let prepare = [];
    this.doctorsData.forEach((e) => {
      let tempObj = [];
      tempObj.push(e.user.fullName);
      tempObj.push(e.hospital);
      tempObj.push(e.gender);
      tempObj.push(e.qualification);
      tempObj.push(e.designation);
      tempObj.push(e.specialist);
      tempObj.push(e.status === 1 ? 'true' : 'false');
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [
        [
        'uniqueId',
        'fullName',
        'mobileNumber',
        'hospital',
        'designation',
        'specialist',
        'status'],
      ],
      body: prepare,
    });
    doc.save('DoctorsData.pdf');
  }
}

  ReadDoctorsDetails() {
    this.doctorsService.getDoctors().subscribe(data => {
      this.doctorsData = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.doctorsData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }

  async changestatus(id: number, status: boolean) {
    if (status === false){
      status = true;
    }
    else{
      status = false;
    }
    this.doctorsForm = {
      status,
    };
    this.doctorsService.updateDoctors(id, this.doctorsForm).subscribe(data => {
      this.ReadDoctorsDetails();
    });
  }
  applyFilter(event: any) {
    this.dataSource.filter =  event.target.value.trim().toLowerCase();
  }
  updateDoctorsData(doctors: any) {
    this.router.navigate([`admin/doctors/${doctors}/edit`]);
  }
  deleteDoctorsData(doctors: number) {
    if (confirm('Are you sure! You want to delete this record?') === true) {
    this.doctorsService.deleteDoctors(doctors).subscribe(data => {
      this.ReadDoctorsDetails();
      this.snackbar.open('DoctorsDetails Deleted', 'Ok', {
        duration: 2000,
      });
    });
  }
}
}
