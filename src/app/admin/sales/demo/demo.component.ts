import { DataLoader } from '@amcharts/amcharts4/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DemoComponent implements OnInit {
  constructor(
    private salesService: SalesItemsService,
  ) { }
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  @ViewChild('sort', { static: false }) sort: MatSort;
  itemsData: any;
   dataSource: any;
  expandedElement: any;
  displayedColumns: string[] = [
    'id',
    'date',
    'invoiceNum',
    'name',
    'mobile',
    'totalAmount',
    'disAmount',
    'netAmount',
    'action'
  ];

  ngOnInit() {
    this.salesService.getSales().subscribe(data => {
      this.itemsData = data;
      // this.isLoading = false;
      this.itemsData = data;
      console.log(this.itemsData);
      this.dataSource = new MatTableDataSource(this.itemsData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}
 
}



