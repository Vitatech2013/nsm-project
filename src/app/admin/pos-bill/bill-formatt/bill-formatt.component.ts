import { Component, OnInit } from '@angular/core';
import { PosBillService } from 'src/app/shared/services/pos-bill.service';

@Component({
  selector: 'app-bill-formatt',
  templateUrl: './bill-formatt.component.html',
  styleUrls: ['./bill-formatt.component.css']
})
export class BillFormattComponent implements OnInit {
  id: any;
  salesData: any;
  ProductName:any;
  invoiceNum:any;
  constructor(private posBillService: PosBillService,) { }

  ngOnInit(): void {
    this.id = this.posBillService.getter();
    console.log(this.id);
    this.posBillService.getSalesId(this.id).subscribe(data => {
      this.salesData = data;
      console.log(this.salesData);
      this.invoiceNum=this.salesData.invoiceNum
      this.ProductName=this.salesData.salesItem[0].product.name
      console.log(this.ProductName);

    })
  }

}
