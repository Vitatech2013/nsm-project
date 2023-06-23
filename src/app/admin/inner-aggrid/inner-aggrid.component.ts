import { FunctionCall } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { UserModel } from 'src/app/shared/models/user.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { PosBillService } from 'src/app/shared/services/pos-bill.service';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';
import { environment } from 'src/environments/environment';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IDetailCellRendererParams,
  IsRowMaster,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { HttpClient } from '@angular/common/http';
let saleItems;
@Component({
  selector: 'app-inner-aggrid',
  templateUrl: './inner-aggrid.component.html',
  styleUrls: ['./inner-aggrid.component.scss']
})

export class InnerAggridComponent implements OnInit {

  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: "id",width:100,cellRenderer: 'agGroupCellRenderer'},
    {field:"date",
    cellRenderer: (data) => {
    
      return moment(data.value).format('MM/DD/YYYY HH:mm a')
 }
},
    {field:"invoiceNum",},
    {field:"name", },
    {field:"mobile"},
    {field:"totalAmount",},
    {field:"disAmount"},
    {field:"netAmount"},

  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailCellRendererParams: any = {
    detailGridOptions: {
      rowSelection: 'multiple',
      suppressRowClickSelection: true,
      enableRangeSelection: true,
      pagination: true,
      paginationAutoPageSize: true,
      columnDefs: [
        { field: 'expiryDate',},
        { field: 'mrp' },
        { field: 'quantity', minWidth: 150 },
        { field: 'product.name',},
        // { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        sortable: true,
        flex: 1,
      },
    },
    getDetailRowData: function (params) {
      let saleitems
      let data=params.data.salesItem
      console.log(params.data.id);

     
      console.log(saleItems);
      saleItems.data.map((data1)=>{
        let sales=data1.sales
        // console.log(sales);
        
if(params.data.id===sales.id){
  console.log(data1,"/////");
  saleitems=data1
}else{

}
      })
       params.successCallback(data);
    },
  } as IDetailCellRendererParams;

  salesForm = new FormGroup({
    name: new FormControl(),
    date: new FormControl(new Date())
  });
  // innerDisplayedColumns = ['name', 'expiryDate', 'mrp', 'quantity', 'netAmount'];
  // expandedElement = 'collapsed';
  dataArray = [];
  tAmount: number;
  quantity: number;
  itemForm;
  date: any;
  groupDefaultExpanded :any;
  groupDisplayType:any;rowSelection:any;
  sId: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  saleid: any;
  Url = environment.root;
  isLoading: boolean;
  id: number;
  dataSource;
  data: any;
  itemsData: any;
  userId: number;
  salesData: any;
  Data: any;
  name: any;
  usersData: any;
  itemData = [];
  saleitemsData:any
  salesdata:any
  users: UserModel | any;
  saleItemsData: any;

  constructor(private http: HttpClient,    private salesItemService: SalesItemsService,
    private salesService:PosBillService,
    private employeeService: EmployeeService,
) {}
  ngOnInit() {
    this.loadData();
    this.id = parseInt(window.localStorage.getItem('id'));
     this.isLoading = true;
    this.employeeService.getEmployees().subscribe(data => {
      this.usersData = data;
      console.log(this.usersData);
      this.usersData = new MatTableDataSource(this.usersData);
    });
    this.getSaleItems();

  }
getSaleItems(){
  this.salesItemService.getSaleItems().subscribe(data => {
    this.saleItemsData = data;
    console.log(this.saleItemsData);
    
   saleItems
    = new MatTableDataSource(this.saleItemsData);

  })
}
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  onGridReady(params: GridReadyEvent) {
    this.loadData();
  
  }
  async loadData() {
    const c = new Date(this.salesForm.value.date);
    console.log(c);
    this.date = moment(c).format('YYYY-MM-DD');
    console.log(this.date);
    this.salesItemService.getSalesById({ id: 0, date: this.date }).subscribe(data => {
      this.itemsData = data;
      this.Data = this.itemsData.salesData;
      console.log(this.Data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.Data);
    });
  }
  userNameFilter(event) {
    console.log(event.target.value);
    this.salesForm.value.name = event.target.value;
    this.usersData.filter = event.target.value.trim().toLowerCase();
    this.users = this.usersData.filteredData;
  }
  usersId(id: number, name: any) {
    this.salesForm.value.name = name;
    this.sId = id;
    console.log(this.salesForm.value.name);
    console.log(this.sId);
  }

  async itemReports() {
    console.log(this.sId);
    console.log(this.salesForm.value.name);
    console.log(this.salesForm.value.date);
    let c = null;
    if (this.salesForm.value.date !== null) {
      c = new Date(this.salesForm.value.date);
      this.date = moment(c).format('YYYY-MM-DD');
    } else {
      this.date = '';
    }
    this.sId = 0;
    this.users.map(emp => {
      console.log(this.salesForm.value.name);
      console.log(emp.user.fullName);
      if (this.salesForm.value.name === emp.user.fullName){
        this.sId = emp.user.id;
        console.log(this.sId);
      }
    });
    console.log(this.sId);
    if (this.sId === null || this.sId === undefined) {
      this.sId = 0;
    }
    console.log(this.sId);
    this.salesItemService.getSalesById({ id: this.sId, date: this.date }).subscribe(data => {
      this.itemsData = data;
      this.Data = this.itemsData.salesData;
      console.log(this.Data);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.Data);
     
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}



