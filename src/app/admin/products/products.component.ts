import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MedicineModel } from 'src/app/shared/models/products.model';
import { InventoryMedicinesService } from 'src/app/shared/services/products.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ColDef } from 'ag-grid-community';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import 'ag-grid-enterprise';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';



let specialCat;
let scheduleCat;


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // columnDefs:any;
  rowData:any;
  columnDefs=[
    { field: "id",headerName:'ID',width:70},
    {field:"name", headerName:'NAME'},

    {field:"specialCategory",headerName:'SPECIAL CATEGORY',width:160,valueGetter:specialCategory},
  

    {field:"packing",headerName:'PACKING',width:110
    // headerName:'Packing', valueGetter: 
    //   function (params) { return params.data.packing + '*' +     params.data.units } 
    },
    {field:"units",headerName:'UNITS',width:100},
    {field:"scheduleCategory",headerName:'SCHEDULE CATEGORY',width:160, valueGetter:scheduleCategory,

     },
  

   
  //   {field:"packing",headerName:'SPECIAL TYPE',editable:true,
  //   cellEditor: 'agRichSelectCellEditor',
  //   cellEditorParams: {
  //     cellHeight: 50,
  //     values: ['1'],
   
     
  //   },
    
  // },
   
    
    // headerName:'Packing', valueGetter: 
    //   function (params) { return params.data.packing + '*' +     params.data.units } 
    
  //  {field:"name",headerName:'DRUG SCHEDULE', editable:true,
  //   cellEditor: 'agRichSelectCellEditor',
  //   cellEditorParams: this.cellCellEditorParams.bind(this),
  //   // cellEditorParams: cellCellEditorParams {
  //   //   cellHeight: 50,
  //   //   values: ['CAPINEA-INJ', 'CAPINEA-INJ'],
     
  //   // },
  // },
  // {field:"status"},

  { field: "createdAt", headerName:'CREATEDAT',
  cellRenderer: (data) => {
    
       return moment(data.value).format('MM/DD/YYYY HH:mm a')
  }
},
  { field: "updatedAt", headerName:'UPDATEDAT',
  cellRenderer: (data) => {
   
        return moment(data.value).format('MM/DD/YYYY HH:mm a')
  }
  },
  {
    headerName: 'Actions',width:100,
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
  
    cellRenderer: 'buttonRenderer1',
    cellRendererParams: {
      onClick: this.onDeleteButtonClick.bind(this),
      label: 'delete',
    },
    },

  ];
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
  medicineData: MedicineModel[] | any;
  displayedColumns: string[] = [
    'id',
    'name',
    'shortName',
    // 'category',
    // 'company',
    // 'hsn',
    // 'GST',
    'unitPacking',
    'status',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  updatedId: number;
  api: any;
  frameworkComponents: { buttonRenderer: any,buttonRenderer1: any};
  defaultColDef: any;
  id: number;
  currentDate: Date;
  sheetdate: string;
  name: any;

  scheduleCategory: any;
  scheduleCategoryData:any;
  scheduleCat:any;
  scheduleCatName: any;
  scheduleCategoryData1: any;
  specialCategory: any;
  specialCategoryData: any;

 

 
  constructor(
    private medicinesService: InventoryMedicinesService,
    private snackbar: MatSnackBar,
    private router: Router,private datepipe: DatePipe,
  ) {  this.frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
    buttonRenderer1:DeleteButtonRendererComponent
  };
  this.defaultColDef = { resizable: true,sortable: true, filter: true}
  }
  ngOnInit(): void {
    this.updatedId = parseInt(window.localStorage.getItem('id'))
    this.isLoading = true,
    this.getMedicines()
    this.medicinesService.getscheduleCategory().subscribe(data => {
      this.scheduleCategory = data;
      this.scheduleCategoryData = data;
      console.log(this.scheduleCategoryData);
      this.scheduleCategoryData = new MatTableDataSource(this.scheduleCategoryData);
      scheduleCat= this.scheduleCategoryData;
    });
    this.medicinesService.getspecialCategory().subscribe(data => {
      this.specialCategory = data;
      this.specialCategoryData = data;
      console.log(this.specialCategoryData);
      this.specialCategoryData = new MatTableDataSource(this.specialCategoryData);
      specialCat=this.specialCategoryData
    });
  }

  getMedicines() {
    this.medicinesService.getMedicines().subscribe(data => {
    this.isLoading = false
    this.medicineData = data;
    this.rowData=data
    console.log(this.medicineData);
    this.dataSource = new MatTableDataSource(this.medicineData);
    console.log('mydata',this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.total = this.dataSource.data.length;
    })
  }
  cellCellEditorParams (params){
    console.log(
      this.medicineData
    );
    // this.medicinesService.getMedicines().subscribe(data => {
    //   this.isLoading = false
    //   this.medicineData = data;
    //   this.rowData=data
    // })

    let selectedCountry
    this.medicineData.map(data=>{
      // console.log(data.name)
    this.name= data.name
    console.log(this.name);
    
    })
    return {
      values: this.name,
    // formatValue: (value) => `(${this.name})`,
   };
    // selectedCountry = this.medicineData[0].name;
    //const allowedCities = countyToCityMap(selectedCountry);
  console.log(this.name);
  
   
  };
  onRowEditingStopped(params) {
    debugger;
  }
  onGridReady(params) {
    this.api = params.api;
    this.getMedicines()
  }
  onEditButtonClick(params) {
    this.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'make',
      
    });
    console.log(params.data.id,"id");
    
    this.router.navigate([`admin/products/${params.data.id}/edit`]);
  }
  onDeleteButtonClick(params) {
  console.log(params.data.id,"///");
   this.id=params.data.id
//  this.api.updateRowData({remove: [params.data]});
  if (confirm("Are you sure! You want to delete this record?") === true) {
      this.medicinesService.deleteMedicines(this.id).subscribe(data => {
        console.log(data);
        
        this.getMedicines();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
}
  

  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "ProductsData";
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
        MedicineName: x.name,
        // Company: x.company.company,
        // HSN:x.hsn.code,
        Unit: x.units,
        UnitPacking: x.packing,
        // Category : x.category.category,
        Status: x.status
      }));

    let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
    let workBook: XLSX.WorkBook = XLSX.utils.book_new();

    // Adjust column width
    var wscols = [
      { wch: 10 }
    ];
    this.currentDate = new Date();
   let latest_date =this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
   this.sheetdate=latest_date
    workSheet["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook,  this.sheetdate +' '+`ProductsData.xlsx`);
  }
}


  downloadPDF() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
      this.currentDate = new Date();
   let latest_date =this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
   this.sheetdate=latest_date
    var prepare = [];
    this.medicineData.forEach((e) => {
      var tempObj = [];
      tempObj.push(e.name);
      // tempObj.push(e.company.company);
      // tempObj.push(e.hsn.code);
      tempObj.push(e.units);
      tempObj.push(e.packing);
      // tempObj.push(e.category.category);
      tempObj.push(e.status);
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [
        [
        'MedicineName',
        // 'Company',
        // 'HSN',
        'Unit',
        'UnitPacking',
        // 'Category',
        'Status'],
      ],
      body: prepare,
    });
    doc.save(this.sheetdate+' '+'ProductsData.pdf');
  }

}
  DeleteMedicine(user: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
    this.medicinesService.deleteMedicines(user).subscribe(data => {
      this.getMedicines();
      this.snackbar.open('Deleted Successfully', 'Ok', {
        duration: 2000,
      });
    });
  }
  }

  UpdateMedicine(id: any) {
    this.router.navigate([`admin/products/${id}/edit`]);
  }

  async changeStatus(id: number, status: boolean) {

  //   this.medicinesService.getMedicinesById(id).subscribe(data=>{
  //  this.medicineData = data;
  //  let mcId = this.medicineData.category.mcId;
   if (status === false){
      status = true;
    }
    else{
      status = false;
    }
   const Form = {
        status,
        updated:this.updatedId
      
      };
   this.medicinesService.updateMedicines(id, Form).subscribe(data => {
        this.getMedicines();
      });
    // });
  }
  
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}


function scheduleCategory(params:any) {
  let scheduleCatName
   
        if(params.data.scheduleCategory!==null){
        
          scheduleCat.data.map(e1 =>{
          
           if(e1.id===params.data.scheduleCategory){
              scheduleCatName=e1.name
             console.log("....",scheduleCatName);
            
           }
       });
      }
       else{
        scheduleCatName=""
      }
      return scheduleCatName;
      }
  function specialCategory(params:any) {
    let specialCatName
  
          if(params.data.specialCategory!==null){
            specialCat.data.map(e1 =>{
              let id=e1.id
              if(e1.id===params.data.specialCategory){
              specialCatName=e1.name
              }
         });
        }
        else{
          specialCatName=""
        }
        return specialCatName
      }



  