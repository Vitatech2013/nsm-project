import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchModel } from 'src/app/shared/models/batch.model';
import { BillModel } from 'src/app/shared/models/Bill.model';
import { BatchService } from 'src/app/shared/services/batch.service';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';
import { PosBillService } from 'src/app/shared/services/pos-bill.service';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SalesDemoComponent } from '../sales-demo/sales-demo.component';

@Component({
  selector: 'app-sales-demo-table',
  templateUrl: './sales-demo-table.component.html',
  styleUrls: ['./sales-demo-table.component.scss']
})
export class SalesDemoTableComponent implements OnInit {
  
  disAmt: any;
  discountAmt = 0;
  discount = 0;
  dis=0;
  netAmt = 0;
  subtotal = 0;
  isLoading!: boolean;
  dataSource: MatTableDataSource<BatchModel>;
  batchData: any;
  Data = [];
  id!: number;
  invoiceNumber: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  data1 = [];

  medicines: any;
  mbSalePrice = [];
  batchData1: any;
  mbBatch = [];
  unitMrp = [];
  mbPurchasePrice = [];
  mbTax = [];
  mbTaxPrice = [];
  mbPrice = [];
  price: any;
  mbQuantity = [];
  Quantity = [];
  mbAmounts: any;
  gstPrice0 = 0;
  gstPrice5 = 0;
  gstPrice12 = 0;
  gstPrice18 = 0;
  gstPrice28 = 0;
  totalGstPrice = 0;
  gstValue0 = 0;
  gstValue5 = 0;
  gstValue12 = 0;
  gstValue18 = 0;
  gstValue28 = 0;
  discountPrice = 0;
  amount = 0;
  total = 0.00;
  Amount = [];
  mbamount = [];
  perMPrice = [];
  mprice: number;
  length: number;
  dataSourcedata: MatTableDataSource<BillModel>;
  simpleDialog: MatDialogRef<SalesDemoComponent> | undefined;
  num: number;
  salesdata: any;
  tot: number;
  batchNumber = []
  displayedColumns2: string[] = ['id', 'productId', 'batchNumber', 'company', 'expiryDate', 'unitMrp', 'quantity', 'freeQuantity', 'availableUnits'];

  displayedColumns1: string[] = ['id', 'productId', 'batchNumber', 'company', 'expiryDate', 'code', 'unitMrp', 'Quantity', 'discount', 'gst', 'mbamount',];
  BatchData: MatTableDataSource<any>;
  BatchData2: any;
  afterdisAmt: number;
  purDisAmount: number;
  created: number;
  paymentType: any;
  posBilldata: any;
  quantity: number;
  hsnTypeId = [];
  hsnTypeIdd: any;
  batchId: number;
  doctorData: any;
  doctor: any;
  doctorid: number;
  totalAmount: number;
  purAmount = 0;
  netAmount = [];
  salesData: any;
  saleid: any;
  salesItemData: any;
  BatchData3: any;
  itemData: any;
  productId = [];
  expiryDate = [];
  hsn = [];
  gst = [];
  code = [];
  DiscountAmount = [];
  DiscountType = [];
  Quantityy = [];
  marginvalue = 0;
  totalUnitPrice = 0;
  totallength: number;
  bId: number;
  availableUnits = [];
  availableunits: number;
  salequantity: any;
  company = [];
  userData: any;
  div: boolean;
  batchData3: any;
  selectedRowIndex: number;
  salesinvoiceNum: any;
  mobileNum: any;
  name: any;
  invoicedata: any;
  salesinvoiceNum1: any;
  disAmount=[];

  constructor(
    private batchService: BatchService, private posBillService: PosBillService,
    private paymentTypeService: PaymentTypeService, private userService: UserService,
    private salesItemsService: SalesItemsService, private doctorsService: DoctorsService, private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    // public dialogRef: MatDialogRef<SalesDemoComponent>
  ) {
    const users: any = [];
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.data.push(this.createNewUser());
  }

  posBillForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobile: new FormControl('',  ),
   
    doctorId: new FormControl('',),
    doctorName:new FormControl('',),
    subTotal: new FormControl('', Validators.required),
    itemDisAmount: new FormControl('', ),
    netAmount: new FormControl('', Validators.required),
    date: new FormControl('', ),
    discount: new FormControl(0),
    description: new FormControl('',),
    invoiceNum: new FormControl('', ),
    disType: new FormControl('percentage', ),
    afterDisAmount: new FormControl('', ),
    paymentTypeId: new FormControl('', Validators.required),
    totalAmount: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    margin: new FormControl('', ),
    rate: new FormControl('',),
    value0: new FormControl('',),
    value5: new FormControl('',),
    value12: new FormControl('',),
    value18: new FormControl('',),
    value28: new FormControl('',),
    gst5: new FormControl('',),
    gst12: new FormControl('',),
    gst18: new FormControl('',),
    gst28: new FormControl('',),
    taxAmount: new FormControl('',),
    round: new FormControl('',),

    paymenType: new FormControl('',),
    Address: new FormControl('',),
  });

  ngOnInit(): void {
    this.gst.push(new FormControl())
    this.saleid = this.route.snapshot.paramMap.get('id');
    this.created = parseInt(window.localStorage.getItem('id'));
    this.ReadBatchDetails();
    this.inform();
    this.paymentTypeService.getPaymentType().subscribe(data => {
      this.paymentType = data
    })
    this.doctorsService.getDoctors().subscribe(data => {
      this.doctor = data;
      this.doctorData = this.doctor;
      this.doctorData = new MatTableDataSource(this.doctorData);
    });
    this.div = false
  }
  inform() {
    this.posBillService.getSalesId(this.saleid).subscribe(data => {
      this.salesData = data;
      console.log(this.salesData);
      this.posBillForm = this.formBuilder.group({
        name: new FormControl(this.salesData.name, Validators.required),
        mobile: new FormControl(this.salesData.mobile, Validators.required),
        // doctorId: new FormControl(this.salesData.user.fullName, [Validators.required]),
        subTotal: new FormControl(this.salesData.subTotal, Validators.required),
        itemDisAmount: new FormControl(this.salesData.itemDisAmount, Validators.required),
        netAmount: new FormControl(this.salesData.netAmount, Validators.required),
        discount: new FormControl(this.salesData.discount, Validators.required),
        description: new FormControl(this.salesData.description, Validators.required),
        disType: new FormControl(this.salesData.disType, Validators.required),
        afterDisAmount: new FormControl(this.salesData.afterDisAmount, Validators.required),
        margin: new FormControl(this.salesData.margin, Validators.required),
        totalAmount: new FormControl(this.salesData.totalAmount, Validators.required),
        amount: new FormControl(this.salesData.amount, Validators.required),
        updated: new FormControl(this.created, Validators.required),
      });
      this.salesItemsService.getSaleItemsSaleById(this.saleid).subscribe(data => {
        this.salesItemData = data;
        console.log(this.salesItemData);
        this.BatchData = new MatTableDataSource(this.salesItemData)
        this.BatchData.data.map((e, index) => {
          this.itemData = e.batch
          console.log(this.itemData);
          this.batchNumber.push(new FormControl())
          this.batchNumber[index].setValue(this.itemData.batchNumber)
          this.BatchData.data[index].batchNumber = this.itemData.batchNumber
          
          this.productId.push(new FormControl())
          this.productId[index].setValue(this.itemData.name)
          this.BatchData.data[index].productId = this.itemData.name

          this.company.push(new FormControl())
          this.company[index].setValue(this.itemData.product.company.company)
          this.BatchData.data[index].company = this.itemData.product.company.company

          this.expiryDate.push(new FormControl())
          this.expiryDate[index].setValue(this.itemData.expiryDate)
          this.BatchData.data[index].expiryDate = this.itemData.expiryDate

          this.unitMrp.push(new FormControl())
          this.unitMrp[index].setValue(this.itemData.unitMrp)
          this.BatchData.data[index].unitMrp = this.itemData.unitMrp
         
          this.code.push(new FormControl())
          this.code[index].setValue(this.itemData.product.hsn.code)
          this.BatchData.data[index].code = this.itemData.product.hsn.code

          this.gst.push(new FormControl())
          this.gst[index].setValue(this.itemData.product.hsn.gst)
          this.BatchData.data[index].gst = this.itemData.product.hsn.gst

          this.Quantity.push(new FormControl())
          this.Quantity[index].setValue(e.quantity)
          this.BatchData.data[index].Quantity = e.quantity

          this.mbamount.push(new FormControl())
          this.mbamount[index].setValue(this.itemData.unitMrp * e.quantity - e.disAmount)
          // this.BatchData.data[index].disAmount = e.disAmount

          this.DiscountAmount.push(new FormControl())
          this.DiscountAmount[index].setValue(e.discount)
          this.BatchData.data[index].DiscountAmount = e.discount

          this.DiscountType.push(new FormControl())
          this.DiscountType[index].setValue(e.disType)
          this.BatchData.data[index].DiscountType = e.disType


          if (this.itemData.product.hsn.gst === "5") {
            this.gstValue5 += this.itemData.unitMrp * e.quantity - e.disAmount
            this.gstPrice5 += parseInt(e.gstAmount.toString())
          }
          else if (this.itemData.product.hsn.gst === "12") {
            this.gstValue12 += this.itemData.unitMrp * e.quantity - e.disAmount
            this.gstPrice12 += parseInt(e.gstAmount.toString())
          }
          else if (this.itemData.product.hsn.gst === "18") {
            this.gstValue18 += this.itemData.unitMrp * e.quantity - e.disAmount
            this.gstPrice18 += parseInt(e.gstAmount.toString())
          }
          else if (this.itemData.product.hsn.gst === "28") {
            this.gstValue28 += this.itemData.unitMrp * e.quantity - e.disAmount
            this.gstPrice28 += parseInt(e.gstAmount.toString())
          }
          else if (this.itemData.product.hsn.gst === "0") {
            this.gstValue0 += this.itemData.unitMrp * e.quantity - e.disAmount
            this.gstPrice0 += parseInt(e.gstAmount.toString())
          }
          this.totalGstPrice = this.gstPrice5 + this.gstPrice12 + this.gstPrice18 + this.gstPrice28
          this.posBillForm = this.formBuilder.group({
            paymentTypeId: new FormControl(e.paymentType.id, Validators.required),

          });

        });
      });
    });
  }
  DoctorFilter(event: any) {
    this.doctorData.filter = event.target.value.trim().toLowerCase();
    this.doctor = this.doctorData.filteredData;
  }

  DoctorId(id: number) {
    this.doctorid = id;
    this.posBillForm.value.doctorId = this.doctorid;
    console.log(this.doctorid);
  }
  ReadBatchDetails() {
    this.batchService.getBatch().subscribe(data => {
      this.batchData = data;
      this.batchData1 = data;
      this.batchData1 = new MatTableDataSource(this.batchData1);

    });
  }

  medicineFilter(event: any) {
    this.data.filter = event.target.value.trim().toLowerCase();
    this.medicines = this.data.filteredData;
    
  }

  openDialog() {
    this.simpleDialog = this.dialog.open(SalesDemoComponent, {
      width: '80%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      console.log(res.data)
      this.batchData1 = res.data;
      const data = {
        id: this.batchData1.id,
        productId: this.batchData1.name,
        gst: this.batchData1.hsn.gst,
        code: this.batchData1.hsn.code,
        shortName: this.batchData1.shortName,
        packing: this.batchData1.packing,
        units: this.batchData1.units,
        company: this.batchData1.company.company,
        category: this.batchData1.category.category,
        batchNumber: this.batchData1.batchNumber,
        // productId: this.batchData1.product.name,
        // gst: this.batchData1.product.hsn.gst,
        // code: this.batchData1.product.hsn.code,
        unitMrp: this.batchData1.unitMrp,
        // unitPrice: this.batchData1.unitPrice,
        // name: this.batchData1.name,
        // mrp: this.batchData1.mrp,
        // expiryDate: this.batchData1.expiryDate,
        // quantity: this.batchData1.quantity,
        // freeQuantity: this.batchData1.freeQuantity,
        // availableQuantity: this.batchData1.availableQuantity,
        // shortName: this.batchData1.shortName,
        // packing: this.batchData1.packing,
        // units: this.batchData1.units,
        // availableUnits: this.batchData1.availableUnits,
        // mfgDate: this.batchData1.mfgDate,
        // purPrice: this.batchData1.purPrice,
        // gstValue: this.batchData1.gstValue,
        // //  disType: this.batchData1.disType,
        // //  discount: this.batchData1.discount,
        // // disAmount: this.batchData1.disAmount,
        // actualCostPrice: this.batchData1.actualCostPrice,
        // margin: this.batchData1.margin,
        // totalAmount: this.batchData1.totalAmount,
        // purchaseId: this.batchData1.purchaseId,
        // hsnTypeId: this.batchData1.hsnTypeId,
        batchId: '',
        doctorId: this.doctorid,
        Quantity: '',
        itemDisAmount: '',
        subTotal: '',
        disType: '',
        disAmount: 0,
        discount: 0,
        afterDisAmount: 0,
        taxAmount: '',
        netAmount: '',
        description: '',
        totalAmount: '',
        status: true,
        created: this.created,
        paymentTypeId: '',
        availableUnits: '',
      };
      this.batchService.getBatchByProductId(this.batchData1.id,).subscribe(data => {
        this.batchData3 = data;
        this.batchData3 = new MatTableDataSource(this.batchData3);

      
      });
      console.log(data)
       this.Data.push(data);
      this.BatchData2 = this.Data;
      // this.BatchData = new MatTableDataSource(this.Data);
      this.BatchData = new MatTableDataSource(this.data1);
      this.totallength = this.BatchData.data.length;
    });
   

    this.div = true
 

  }


  onClick(row: any, i) {
 
    let added=false
    if (!this.BatchData.data[0]) {
      this.data1.push(row);
      this.BatchData = new MatTableDataSource(this.data1)
      this.BatchData.data.map((e, index) => {
        this.BatchData.data[index]['id'] = e.id;

        this.batchNumber.push(new FormControl())
        this.batchNumber[index].setValue(e.batchNumber)
        this.BatchData.data[index].batchNumber = e.batchNumber
    
        this.expiryDate.push(new FormControl())
        this.expiryDate[index].setValue(e.expiryDate)
        this.BatchData.data[index].expiryDate = e.expiryDate
    
        this.productId.push(new FormControl())
        this.productId[index].setValue(e.product.name)
        this.BatchData.data[index].productId = e.product.name
    
        this.company.push(new FormControl())
        this.company[index].setValue(e.product.company.company)
        this.BatchData.data[index].company = e.product.company.company
    
        this.unitMrp.push(new FormControl())
        this.unitMrp[index].setValue(e.unitMrp)
        this.BatchData.data[index].unitMrp = e.unitMrp
    
        this.code.push(new FormControl())
        this.code[index].setValue(e.product.hsn.code)
        this.BatchData.data[index].code = e.product.hsn.code
    
        this.gst.push(new FormControl())
        this.gst[index].setValue(e.product.hsn.gst)
        this.BatchData.data[index].gst = e.product.hsn.gst

        this.Quantity.push(new FormControl())
        this.Quantity[index].setValue(e.Quantity)
        this.BatchData.data[index].Quantity = e.Quantity
        
        this.DiscountType.push(new FormControl())
        this.DiscountAmount.push(new FormControl())
        
        this.disAmount.push(new FormControl())

        this.disAmount[index].setValue(e.disAmount)
      
        console.log( this.disAmount[index].value);
      
    
    
      });   
     }
    else if(this.BatchData.data[0]){
      added=false
     
      // this.selectedRowIndex = i + 1;
      this.BatchData.data.map((e, index) => {
        this.BatchData.data[index]['id'] = e.id;
        if (e.name === row.product.name && e.batchNumber===row.batchNumber) {
        added=true
          alert("Product Already Exist")
            
          }
        })
          if(!added){
            console.log("else working")
            this.data1.push(row);
            this.BatchData = new MatTableDataSource(this.data1)
            this.BatchData.data.map((e, index) => {

               this.BatchData.data[index]['id'] = e.id;
              // let Quantity = this.BatchData.data[index]['Quantity']
              this.batchNumber.push(new FormControl())
              this.batchNumber[index].setValue(e.batchNumber)
              this.BatchData.data[index].batchNumber = e.batchNumber
          
              this.expiryDate.push(new FormControl())
              this.expiryDate[index].setValue(e.expiryDate)
              this.BatchData.data[index].expiryDate = e.expiryDate
          
              this.productId.push(new FormControl())
              this.productId[index].setValue(e.product.name)
              this.BatchData.data[index].productId = e.product.name
          
              this.company.push(new FormControl())
              this.company[index].setValue(e.product.company.company)
              this.BatchData.data[index].company = e.product.company.company
          
              this.unitMrp.push(new FormControl())
              this.unitMrp[index].setValue(e.unitMrp)
              this.BatchData.data[index].unitMrp = e.unitMrp
          
              this.code.push(new FormControl())
              this.code[index].setValue(e.product.hsn.code)
              this.BatchData.data[index].code = e.product.hsn.code
          
              this.gst.push(new FormControl())
              this.gst[index].setValue(e.product.hsn.gst)
              this.BatchData.data[index].gst = e.product.hsn.gst
              this.Quantity.push(new FormControl())
              this.Quantity[index].setValue(e.Quantity)
              this.BatchData.data[index].Quantity = e.Quantity
              
              this.DiscountAmount.push(new FormControl())
              this.DiscountType.push(new FormControl())
              this.disAmount.push(new FormControl())

              this.disAmount[index].setValue(e.disAmount)
              console.log( this.disAmount[index].value);
              
              
            });
            added=false
            
          }
    }
  }

  
  addItem(event: any, fieldName: any, index: any) {
    let value;
    if (typeof event === 'string') {
      value = event;
    } else if (event.option) {
      value = event.option.value;
    } else {
      value = event.target.value;
    }
    this.BatchData.data[index][fieldName] = value;
  }
  createNewUser(): BatchModel | any {
    const data = {
      subTotal: '',
      totalGst: '',
      netAmount: '',
      batchNumber: '',
      productId: '',
      batchName: '',
      Quantity: '',
      unitMrp: '',
      code: '',
      gst: '',
      discount: '',
      mPrice: '',
      mbPrice: '',
      mbamount: '',
      gstValue5: 0,
      gstValue12: 0,
      gstValue18: 0,
      gstValue28: 0,
      gstValue0: 0,
      actualCostPrice: ''
      , eId: 0,
      mId: 0,
      mbCreatedAt: '',
      status: true,
      pId: 0,

    };
    return data;

  }
  addRow() {
    this.batchData.data.push(this.createNewUser());
    this.batchData.filter = '';
  }
  medicibeId(id: number, index: number) {
    let gstValue5 = 0;
    let gstValue12 = 0;
    let gstValue18 = 0;
    let gstValue28 = 0;
    let gstValue0 = 0;
    let amount = 0;
    let Amount = 0;
    let discount=0;
    let marginAmount = 0;
    let totalUnitPrice = 0;
    let mbAmount = 0;
    let mbgstValue0 = 0;
    let mbgstValue5 = 0;
    let mbgstValue12 = 0;
    let mbgstValue18 = 0;
    let mbgstValue28 = 0;
    this.BatchData.data[index]['id'] = id;

    this.BatchData.data[index]['batchId'] = this.batchId
    let Quantity = this.BatchData.data[index]['Quantity']
    this.quantity = Quantity;
    this.batchId = id;
    this.batchService.getBatchById(id).subscribe(data => {
      this.batchData1 = data;
      console.log(this.batchData1)
      this.hsnTypeId.push(new FormControl());
      this.hsnTypeId[index].setValue(this.batchData1.hsnType.id);
      this.BatchData.data[index].hsnTypeId = this.batchData1.hsnType.id
      this.hsnTypeIdd = this.hsnTypeId[index].value;

      this.availableUnits.push(new FormControl());
      this.availableUnits[index].setValue(this.batchData1.availableUnits);
      this.BatchData.data[index].availableUnits = this.batchData1.availableUnits
      this.availableunits = this.availableUnits[index].value

      console.log(this.availableunits)
      this.unitMrp.push(new FormControl());
      this.unitMrp[index].setValue(this.batchData1.unitMrp);
      this.BatchData.data[index].unitMrp = this.batchData1.unitMrp;

      this.mbamount.push(new FormControl());
      this.mbamount[index].setValue(Quantity * this.unitMrp[index].value);



      this.mbTaxPrice.push(new FormControl());
      this.mbTaxPrice[index].setValue(this.batchData1.product.hsn.gst);
      this.BatchData.data[index].gst = this.batchData1.product.hsn.gst;
      
      this.netAmt = this.mbamount[index].value
      this.purAmount = this.mbamount[index].value
      mbAmount = this.BatchData.data[index].unitMrp * Quantity

      let gst = this.BatchData.data[index].gst
      let gstValue = ((mbAmount) * parseInt(gst)) / 100;
      this.BatchData.data[index]['totalAmount'] = mbAmount + gstValue
      this.BatchData.data[index]['discount'] = 0
      this.BatchData.data[index]['disAmount'] = discount
      this.BatchData.data[index]['gstValue'] = gstValue
      // this.BatchData.data[index]['availableUnits'] = this.availableunits - Quantity
      this.BatchData.data[index]['actualCostPrice'] = (mbAmount + gstValue)
     
      if (gst === '5') {
        mbgstValue5 = this.mbamount[index].value
        let gstValue5 = parseFloat(mbgstValue5.toFixed(3));
        this.BatchData.data[index]['gstValue5'] = gstValue5
        this.gstValue5 = gstValue5;
        console.log(this.gstValue5)
        let amt = this.gstPrice5 + gstValue5;
        console.log(amt);

        this.mbamount.push(new FormControl());
        this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))

      }
      else if (gst ==='12') {
        mbgstValue12 = this.mbamount[index].value
        let value12 = parseFloat(mbgstValue12.toFixed(3));
        this.BatchData.data[index]['gstValue12'] = value12
        let amt = this.gstPrice12 + value12;
        this.gstValue12 = value12;
        this.mbamount.push(new FormControl());
        this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
      }
      else if (gst === '18') {
        mbgstValue18 = this.mbamount[index].value
        let value18 = parseFloat(mbgstValue18.toFixed(3));
        this.BatchData.data[index]['gstValue18'] = value18
        this.gstValue18 = value18;
        let amt = this.gstPrice18 + value18;
        this.mbamount.push(new FormControl());
        this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
      }
      else if (gst === '28') {
        mbgstValue28 =this.mbamount[index].value
        let value28 = parseFloat(mbgstValue28.toFixed(3));
        this.BatchData.data[index]['gstValue28'] = value28
        this.gstValue28 = value28;

        let amt = this.gstPrice28 + value28;
        this.mbamount.push(new FormControl());
        this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
      }
      else if (gst === '0') {
        mbgstValue0 = this.mbamount[index].value
        this.BatchData.data[index]['gstValue0'] = mbgstValue0
        this.mbamount.push(new FormControl());
        this.mbamount[index].setValue(this.gstPrice0 + mbgstValue0)

      }

      this.BatchData.data.forEach((element, i) => {
        amount = element.unitMrp * element.Quantity
        marginAmount = element.unitPrice * element.Quantity

        if (element.gst === '5') {
          let value5 = element.gstValue5
          gstValue5 += element.gstValue5
          this.gstPrice5 = (this.gstValue5 * 5) / 100
          let amt = this.gstPrice5 + value5;
          this.mbamount.push(new FormControl());
          this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))

        }
        else if (element.gst === '12') {
          let value12 = element.gstValue12
          gstValue12 += element.gstValue12
          this.gstPrice12 = (this.gstValue12 * 12) / 100
         

          let amt = this.gstPrice12 + value12;
         
          this.mbamount.push(new FormControl());
          this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))

        }
        else if (element.gst === '18') {
          let value18 = element.gstValue18
          gstValue18 += element.gstValue18
          this.gstPrice18 = (this.gstValue18 * 18) / 100
          let amt = this.gstPrice18 + value18;
          this.mbamount.push(new FormControl());
          this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
        }
        else if (element.gst === '28') {
          let value28 = element.gstValue28
          gstValue28 += element.gstValue28
          this.gstPrice28 = (this.gstValue28 * 28) / 100
          let amt = this.gstPrice28 + value28;
          this.mbamount.push(new FormControl());
          this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
        }
        else if (element.gst === "0") {
          let value0 = element.gstValue18
          gstValue0 += element.gstValue0
          this.gstPrice0 = (this.gstValue0 * 0) / 100
          let amt = this.gstPrice0 + value0;
          this.mbamount.push(new FormControl());
          this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
        }
        Amount += amount
        totalUnitPrice += marginAmount

      })
      this.totalUnitPrice = totalUnitPrice
      this.purAmount = Amount;
      let aamount = Amount
      this.amount = parseFloat(aamount.toFixed(3))
      this.gstValue0 = gstValue0
      this.gstValue5 = gstValue5
      this.gstValue12 = gstValue12
      this.gstValue18 = gstValue18
      this.gstValue28 = gstValue28
      let gstPrice5 = (this.gstValue5 * 5) / 100
      this.gstPrice5 = parseFloat(gstPrice5.toFixed(3))
      console.log(this.gstPrice5)
      let gstPrice12 = (this.gstValue12 * 12) / 100
      this.gstPrice12 = parseFloat(gstPrice12.toFixed(3))
      let gstPrice18 = (this.gstValue18 * 18) / 100
      this.gstPrice18 = parseFloat(gstPrice18.toFixed(3))
      let gstPrice28 = (this.gstValue28 * 28) / 100
      this.gstPrice28 = parseFloat(gstPrice28.toFixed(3))
      let totalGstPrice = this.gstPrice5 + this.gstPrice12 + this.gstPrice18 + this.gstPrice28
      this.totalGstPrice = parseFloat(totalGstPrice.toFixed(3))
      let total = this.amount + this.totalGstPrice
      this.total = parseFloat(total.toFixed(3))
      let netAmt = this.total
      this.purAmount = this.amount
      this.netAmt = parseFloat(netAmt.toFixed(3))
      let marginvalue = ((this.netAmt - this.totalUnitPrice) / this.netAmt) * 100
      this.marginvalue = parseFloat(marginvalue.toFixed(3))
     
      this.BatchData.data[index]['batchId'] = this.batchId
      this.BatchData.data[index]['netAmount'] = this.netAmt;
      this.BatchData.data[index]['subTotal'] = this.amount;
      // this.BatchData.data[index]['disType'] ="";
      // this.BatchData.data[index]['itemDisAmount'] = 0;
      // this.BatchData.data[index]['disAmount'] =this.discountPrice;
      // this.BatchData.data[index]['discount'] = this.amount;
      this.BatchData.data[index]['afterDisAmount'] = this.amount;
      this.BatchData.data[index]['taxAmount'] = this.totalGstPrice;
      this.discountPrice=0
      this.BatchData.data[index]['netAmount'] = this.netAmt;
      this.BatchData.data[index]['subTotal'] = this.amount;
      this.BatchData.data[index]['disType'] = this.BatchData.data[index].disType;
      this.BatchData.data[index]['itemDisAmount'] = this.discountPrice;
      // this.BatchData.data[index]['disAmount'] =this.discountPrice;
      // this.BatchData.data[index]['discount'] = this.amount;
      this.BatchData.data[index]['afterDisAmount'] = this.amount;
      this.BatchData.data[index]['taxAmount'] = this.totalGstPrice;
      // this.BatchData.data[index]['totalAmount'] = this.discountPrice;
      this.BatchData.data[index]['taxAmount'] = this.total;
      this.BatchData.data[index]['status'] = true;
      this.BatchData.data[index]['created'] = this.created;
      this.BatchData.data[index]['doctorId'] = this.doctorid;
      this.BatchData.data[index]['Quantity'] = this.quantity;
      this.BatchData.data[index]['paymentTypeId'] = this.posBillForm.value.paymentTypeId;
      this.BatchData.data[index]['batchId'] = this.batchId
      this.div = false
    });

    this.calculations(id,index)


  }
   calculations(id: number, index: number) {
     console.log(index,id);
     
    let amount = 0;
    let DiscountPrice = 0;
    let discountPrice = 0;
    let Amount = 0;
    let mbAmount = 0;
    let marginAmount = 0;
    // let discount = 0;
    let gstValue5 = 0;
    let gstValue12 = 0;
    let gstValue18 = 0;
    let gstValue28 = 0;
    let gstValue0 = 0;
    let mbgstValue0 = 0;
    let mbgstValue5 = 0;
    let mbgstValue12 = 0;
    let mbgstValue18 = 0;
    let mbgstValue28 = 0;
    let totalUnitPrice = 0
    let discount=0
    // let id = this.BatchData.data[index]['id'];
    this.BatchData.data[index]['id'] = id;
    let Quantity = this.BatchData.data[index]['Quantity']
   
    discount = (this.BatchData.data[index]['Discount'])??0
    console.log(discount);

    this.quantity = Quantity;
    this.batchId = id;
    this.BatchData.data[index]['batchId'] = this.batchId
    // console.log(discount);
   
    this.batchService.getBatchById(id).subscribe(data => {
      this.batchData1 = data;
      console.log(this.batchData1)
      // this.hsnTypeId.push(new FormControl());
      // this.hsnTypeId[index].setValue(this.batchData1.hsnType.id);
      // this.BatchData.data[index].hsnTypeId = this.batchData1.hsnType.id
      // this.hsnTypeIdd = this.hsnTypeId[index].value;

      this.availableUnits.push(new FormControl());
      this.availableUnits[index].setValue(this.batchData1.availableUnits);
      this.BatchData.data[index].availableUnits = this.batchData1.availableUnits
      this.availableunits = this.availableUnits[index].value
    
      console.log(this.BatchData.data);
      console.log(this.availableunits)
      this.unitMrp.push(new FormControl());
      this.unitMrp[index].setValue(this.batchData1.unitMrp);
      this.BatchData.data[index].unitMrp = this.batchData1.unitMrp;

      this.mbamount.push(new FormControl());
      this.mbamount[index].setValue(Quantity * this.unitMrp[index].value);

      this.mbTaxPrice.push(new FormControl());
      this.mbTaxPrice[index].setValue(this.batchData1.product.hsn.gst);
      this.BatchData.data[index].gst = this.batchData1.product.hsn.gst;
      this.netAmt = this.mbamount[index].value
      this.purAmount = this.mbamount[index].value


      discount = (this.BatchData.data[index]['Discount'])??0
    this.BatchData.data[index]['id'] = id;
    let discountType = this.BatchData.data[index].disType
    // let mrp = this.BatchData.data[index].mrp
    this.quantity = Quantity;
    let gst = this.BatchData.data[index].gst
    console.log(gst);
    mbAmount = this.BatchData.data[index].unitMrp * Quantity
    let unitPrice = this.BatchData.data[index].unitPrice
    if (discountType === 'flat') {
      discount = this.BatchData.data[index].Discount
    }
    else if (discountType === 'percentage') {
      console.log(this.BatchData.data[index].Discount);
      discount = mbAmount * this.BatchData.data[index].Discount / 100
    }
   
    if (isNaN(discount)) {
      discount=0
      let gstValue = ((mbAmount - discount) * parseInt(gst)) / 100;
    this.mbamount[index].setValue(gstValue)

    this.BatchData.data[index]['totalAmount'] = mbAmount + gstValue
    console.log(this.BatchData.data[index]['totalAmount']);
    
    this.BatchData.data[index]['discount'] = this.BatchData.data[index].Discount
    this.BatchData.data[index]['disAmount'] = discount
    this.BatchData.data[index]['gstValue'] = gstValue
    this.BatchData.data[index]['availableUnits'] = this.availableunits - Quantity
    this.BatchData.data[index]['actualCostPrice'] = (mbAmount - parseInt(discount.toString()) + gstValue)
    let actualCostPrice = (mbAmount - parseInt(discount.toString()) + gstValue)

}
else{
  let gstValue = ((mbAmount - discount) * parseInt(gst)) / 100;
  this.mbamount[index].setValue(gstValue)

  this.BatchData.data[index]['totalAmount'] = mbAmount + gstValue
  console.log(this.BatchData.data[index]['totalAmount']);
  
  this.BatchData.data[index]['discount'] = this.BatchData.data[index].Discount
  this.BatchData.data[index]['disAmount'] = discount
  this.BatchData.data[index]['gstValue'] = gstValue
  this.BatchData.data[index]['availableUnits'] = this.availableunits - Quantity
  this.BatchData.data[index]['actualCostPrice'] = (mbAmount - parseInt(discount.toString()) + gstValue)
  let actualCostPrice = (mbAmount - parseInt(discount.toString()) + gstValue)
}
   
   
    if (gst === '5') {
     discount=(this.BatchData.data[index]['Discount'])??0
      mbgstValue5 = mbAmount - discount
      let value5 = parseFloat(mbgstValue5.toFixed(3));
      this.BatchData.data[index]['gstValue5'] = value5
      this.gstPrice5 = (value5 * 5) / 100
      let amt = this.gstPrice5 + value5;
      this.mbamount.push(new FormControl());
      this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))

    }
    else if (gst === "12") {
      discount = (this.BatchData.data[index]['Discount'])??0
      console.log(mbAmount,discount);
      mbgstValue12 = mbAmount-discount
      let value12 = parseFloat(mbgstValue12.toFixed(3));
      this.BatchData.data[index]['gstValue12'] = value12
      this.gstPrice12 = (value12 * 12) / 100
      console.log(this.gstPrice12);
      let amt = this.gstPrice12 + value12;
      console.log(amt);

      this.mbamount.push(new FormControl());
      this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
    }
    else if (gst === "18") {
      discount = (this.BatchData.data[index]['Discount'])??0
      console.log(mbAmount,discount);
      mbgstValue18 = mbAmount-discount
      let value18 = parseFloat(mbgstValue18.toFixed(3));
      this.BatchData.data[index]['gstValue18'] = value18
      this.gstPrice18 = (value18 * 18) / 100
      this.gstValue18 = value18;
      console.log(this.gstPrice18);
      let amt = this.gstPrice18 + value18;
      console.log(amt);
      this.mbamount.push(new FormControl());
      this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
    }
    
    else if (gst === "28") {
      discount = (this.BatchData.data[index]['Discount'])??0
      mbgstValue28 = mbAmount -discount
      let value28 = parseFloat(mbgstValue28.toFixed(3));
      this.BatchData.data[index]['gstValue28'] = value28
      this.gstPrice28 = (value28 * 28) / 100
      let amt = this.gstPrice28 + value28;
      this.mbamount.push(new FormControl());
      this.mbamount[index].setValue(parseFloat(amt.toFixed(3)))
    }
    else if (gst === "0") {
      mbgstValue0 = mbAmount - (this.BatchData.data[index]['Discount'])??0
      this.BatchData.data[index]['gstValue0'] = mbgstValue0
      this.mbamount.push(new FormControl());
      this.mbamount[index].setValue(this.gstPrice0 + mbgstValue0)

    }
   
    this.BatchData.data.forEach((element, i) => {
      amount = element.unitMrp * element.Quantity
    
      marginAmount = element.unitPrice * element.Quantity
      if (element.disType === 'flat') {
     
        discountPrice += parseInt(element.discount.toString())
      }
      else if (element.disType === 'percentage') {
        
        discountPrice += amount * element.discount / 100
      }
    
      if (element.gst === "5") {
        gstValue5 += element.gstValue5
        this.gstPrice5 = (this.gstValue5 * 5) / 100

      }
      else if (element.gst === "12") {
        
        gstValue12 += element.gstValue12
        this.gstPrice12 = (this.gstValue12 * 12) / 100

      }
      else if (element.gst === "18") {
        gstValue18 += element.gstValue18
        this.gstPrice18 = (this.gstValue18 * 18) / 100
      }
      else if (element.gst === "28") {
        gstValue28 += element.gstValue28
        this.gstPrice28 = (this.gstValue28 * 28) / 100
      }
      else if (element.gst === "0") {
        gstValue0 += element.gstValue0
        this.gstPrice0 = (this.gstValue0 * 0) / 100
      }
      Amount += amount
      totalUnitPrice += marginAmount
    
    })
    this.totalUnitPrice = totalUnitPrice
    this.purAmount = Amount;
    if (isNaN(discountPrice)) {
      discountPrice = 0;
}
else{
  discountPrice=discountPrice
}
    // let disprice=typeof(discountPrice)??0
    // console.log(discountPrice);
    // console.log(disprice); 
    let aamount = Amount - discountPrice;
    this.amount = parseFloat(aamount.toFixed(3))
    console.log(this.amount);
    let discountPricee = discountPrice
    this.discountPrice = parseFloat(discountPricee.toFixed(3))
    this.gstValue0 = gstValue0
    this.gstValue5 = gstValue5
    this.gstValue12 = gstValue12
    this.gstValue18 = gstValue18
    this.gstValue28 = gstValue28
    let gstPrice5 = (this.gstValue5 * 5) / 100
    this.gstPrice5 = parseFloat(gstPrice5.toFixed(3))
    let gstPrice12 = (this.gstValue12 * 12) / 100
    this.gstPrice12 = parseFloat(gstPrice12.toFixed(3))
    let gstPrice18 = (this.gstValue18 * 18) / 100
    this.gstPrice18 = parseFloat(gstPrice18.toFixed(3))
    let gstPrice28 = (this.gstValue28 * 28) / 100
    this.gstPrice28 = parseFloat(gstPrice28.toFixed(3))
    let totalGstPrice = this.gstPrice5 + this.gstPrice12 + this.gstPrice18 + this.gstPrice28
    this.totalGstPrice = parseFloat(totalGstPrice.toFixed(3))
    let total = this.amount + this.totalGstPrice
    this.total = parseFloat(total.toFixed(3))
    let netAmt = this.total
    this.netAmt = parseFloat(netAmt.toFixed(3))
    let marginvalue = ((this.netAmt - this.totalUnitPrice) / this.netAmt) * 100
    this.marginvalue = parseFloat(marginvalue.toFixed(3))
    // this.mbamount.push(new FormControl())
    // this.mbamount[index].setValue(mbAmount - discount)
    this.BatchData.data[index]['netAmount'] = this.netAmt;
    this.BatchData.data[index]['subTotal'] = this.amount;
    this.BatchData.data[index]['disType'] = this.BatchData.data[index].disType;
    this.BatchData.data[index]['itemDisAmount'] = this.discountPrice;
    // this.BatchData.data[index]['disAmount'] =this.discountPrice;
    // this.BatchData.data[index]['discount'] = this.amount;
    this.BatchData.data[index]['afterDisAmount'] = this.amount;
    this.BatchData.data[index]['taxAmount'] = this.totalGstPrice;
    // this.BatchData.data[index]['totalAmount'] = this.discountPrice;
    this.BatchData.data[index]['taxAmount'] = this.total;
    this.BatchData.data[index]['status'] = true;
    this.BatchData.data[index]['created'] = this.created;
    this.BatchData.data[index]['doctorId'] = this.doctorid;
    this.BatchData.data[index]['Quantity'] = this.quantity;
    this.BatchData.data[index]['paymentTypeId'] = this.posBillForm.value.paymentTypeId;
    this.BatchData.data[index]['batchId'] = this.batchId
    // this.netAmount.push(new FormControl())
    // this.netAmount[index].setValue(this.netAmt)
  })
  this.div = false;
  }

  
  
  purCalculations() {
   
    if (this.posBillForm.value.disType === 'flat') {
      this.purDisAmount = this.posBillForm.value.discount
    }
    else if (this.posBillForm.value.disType === 'percentage') {
      this.purDisAmount = this.total * this.posBillForm.value.discount / 100
    }
    let netAmt = this.total - this.purDisAmount
    this.netAmt = parseFloat(netAmt.toFixed(3))
    let marginvalue = ((this.netAmt - this.totalUnitPrice) / this.netAmt) * 100
    this.marginvalue = parseFloat(marginvalue.toFixed(3))
  }
  insertsales() {
    if (this.posBillForm.valid === true) {
      if(this.totallength+1>0){
      
      let salesdata = {
        // invoiceNum: this.posBillForm.value.invoiceNum,
        name: this.posBillForm.value.name,
        mobile: this.posBillForm.value.mobile,
        doctorId:  this.doctorid??0,
        doctorName: this.posBillForm.value.doctorName,
        itemDisAmount: this.posBillForm.value.itemDisAmount,
        amount: this.posBillForm.value.amount,
        subTotal: this.posBillForm.value.subTotal,
        disType: this.posBillForm.value.disType,
        disAmount:this.purDisAmount??0,
        discount:parseInt(this.posBillForm.value.discount),
        afterDisAmount: this.posBillForm.value.afterDisAmount,
        taxAmount: this.posBillForm.value.taxAmount,
        netAmount: this.posBillForm.value.netAmount,
        margin: parseInt(this.posBillForm.value.margin),
        description: this.posBillForm.value.description,
        totalAmount: this.posBillForm.value.totalAmount,
        status: true,
        paymentTypeId: parseInt(this.posBillForm.value.paymentTypeId),
        created: this.created
      }
      console.log(salesdata);
      
      this.posBillService.addSales(salesdata).subscribe(data => {
        this.posBilldata = data;
        console.log(this.posBilldata);
        
        console.log( this.BatchData.data,"saleItem");
        this.BatchData.data.map(e => {
          console.log(e);
          let saleItemData=[];
          this.bId = e.batchId,
            console.log(this.bId);
          this.salequantity = e.Quantity
          saleItemData.push({
            batchId: e.batchId,
            // hsnTypeId: this.hsnTypeIdd,
            quantity: parseInt(e.Quantity),
            productId: e.product.id,
            expiryDate: e.expiryDate,
            mrp: parseInt(e.mrp),
            salesId: this.posBilldata.data.id,
            // itemDisAmount: e.itemDisAmount,
            // subTotal: e.subTotal,
            disType: e.disType,
            disAmount: e.disAmount,
            discount: e.discount??0,
            // afterDisAmount: e.afterDisAmount,
            gstAmount: e.gstValue,
            netAmount: e.actualCostPrice,
            // paymentTypeId: parseInt(this.posBillForm.value.paymentTypeId),
            totalAmount: e.totalAmount,
            status: e.status,
            created: e.created
  
          });
          console.log(this.posBillForm.value.paymentTypeId);
          
          
          console.log(saleItemData);
          let batch = {
            id: e.batchId,
            availableUnits: e.availableUnits - e.quantity,
            updated: this.created
          }
          let id = this.bId
          console.log(id);
          console.log(batch);
          console.log(saleItemData);
          
          this.salesItemsService.addSaleItems(saleItemData).subscribe(data => {
            this.batchService.updateUnits(id, batch).subscribe(data => {
              if (data) {
                this.snackbar.open('sales Added!', 'Success', {
                  duration: 2000,
                });
                this.router.navigate(['/admin/pos-bill']);
              }
          
            })
          })
        })
      })

  
     }
     else{
      alert('No Data Found');
    return;
  }
    }
    
    else{
        alert('Please fill all the Mandetory Fields');
      return;
    // this.BatchData.data.push(this.data1)
    // const number = "Nsm001"
    // this.posBillForm.value.invoiceNum = number;
    }
   
  }

  keyPressNumeric(event) {
    let inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressAlphaNumeric(event) {
    let inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
