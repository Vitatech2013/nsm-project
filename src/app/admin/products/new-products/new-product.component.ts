import { HsnModel } from '../../../shared/models/hsn.model';
import { HsnService } from '../../../shared/services/hsn.service';
import { CompanyService } from '../../../shared/services/company.service';
import { Component, Input, OnInit,Pipe,PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { MedicineModel } from 'src/app/shared/models/products.model';
import { InventoryMedicinesService } from 'src/app/shared/services/products.service';
import { MedicineCategoryService } from 'src/app/shared/services/medicine-category.service';
import { Companymodel } from 'src/app/shared/models/company.model';
import { HsnTypeService } from 'src/app/shared/services/hsn-type.service';
import { transform } from '@progress/kendo-drawing/dist/npm/geometry';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})

export class NewProductsComponent implements  OnInit {
  @Input() name: any;
  userId: number | any;
  category: CategoryModel | any;
  id: number | any;
  medicineData: MedicineModel | any;
  medicineForm: FormGroup;
  hsn: any;
  cId: number | any;
  company: any;
  companyData: any;
  hsnData: HsnModel | any;
  hId: number | any;
  hsnType: any;
  categoryData: CategoryModel | any;
  catId: number;
  hsnId: number;
  shortname: string;
  packing: number;
  units: number;
  showAlert:boolean=false;
  scheduleCategory: any;
  scheduleCategoryData: any;
  specialCategoryData: any;
  specialCategory: any;
  specialCatId: number;
  scheduleCatId: number
  scheduleEditData:any
  specialEditData:any
  scheduleName:any
  specialName:any


  constructor(
    private medicinesService: InventoryMedicinesService,
    private router: Router,
    private hsnTypeService: HsnTypeService,
    private snackBar: MatSnackBar,
    private categoryService: MedicineCategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private hsnService: HsnService
  ) {

  }
  
  ngOnInit(): void {
    this.userId = parseInt(window.localStorage.getItem('id'));
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.hsnService.getHSN().subscribe(data => {
      this.hsn = data;
      console.log(this.hsn);
      this.hsnData = data;
      console.log(this.hsnData);
      this.hsnData = new MatTableDataSource(this.hsnData);
    });


    this.intForm();
    this.companyService.getCompany().subscribe(data => {
      this.company = data;
      this.companyData = data;
      console.log(this.companyData);
      this.companyData = new MatTableDataSource(this.companyData);
    });
    this.categoryService.getCategory().subscribe(data => {
      this.category = data;
      this.categoryData = data;
      console.log(this.categoryData);
      this.categoryData = new MatTableDataSource(this.categoryData);
    });
    this.medicinesService.getscheduleCategory().subscribe(data => {
      this.scheduleCategory = data;
      this.scheduleCategoryData = data;
      console.log(this.scheduleCategoryData);
      this.scheduleCategoryData = new MatTableDataSource(this.scheduleCategoryData);
    });
    this.medicinesService.getspecialCategory().subscribe(data => {
      this.specialCategory = data;
      this.specialCategoryData = data;
      console.log(this.specialCategoryData);
      this.specialCategoryData = new MatTableDataSource(this.specialCategoryData);
    });

    this.medicineForm = new FormGroup({
      name: new FormControl('', Validators.required),
      companyId: new FormControl('', Validators.required),
      hsnId: new FormControl('', Validators.required),
      specialCategory: new FormControl('', Validators.required),
      scheduleCategory: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required),
      units: new FormControl('', Validators.required),
      packing: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl(true, Validators.required),
      created: new FormControl(this.userId, Validators.required),
    });
  }

  async intForm() {
    if (this.id) {
      this.medicinesService.getMedicinesById(this.id).subscribe(data => {
        console.log(data);
        this.medicineData = data;
        this.cId = this.medicineData.company.id;
        this.catId = this.medicineData.category.id;
        this.hsnId = this.medicineData.hsn.id;
        this.scheduleCatId=this.medicineData.scheduleCategory??0;
        this.specialCatId=this.medicineData.specialCategory??0
        console.log(this.scheduleCatId, this.specialCatId);
        
        this.medicinesService.getscheduleCategoryById(this.scheduleCatId).subscribe(data => {
          if(data){
         this.scheduleEditData=data;
         this.scheduleName=this.scheduleEditData.name
          }
          else{
            this.scheduleName="";
          }
        this.medicinesService.getspecialCategoryById(this.specialCatId).subscribe(data => {
          if(data){
          this.specialEditData=data;
          this.specialName=this.specialEditData.name
          }
          else{
            this.specialName="";
          }
        
        this.medicineForm = this.formBuilder.group({
          name: new FormControl(this.medicineData.name, Validators.required),
          companyId: new FormControl(this.medicineData.company.company, Validators.required),
          hsnId: new FormControl(this.medicineData.hsn.code, Validators.required),

          specialCategory: new FormControl(this.specialName, Validators.required),
          scheduleCategory: new FormControl(this.scheduleName, Validators.required),
         shortName: new FormControl(this.medicineData.shortName, Validators.required),

          categoryId: new FormControl(this.medicineData.category.category, Validators.required),

          units: new FormControl(this.medicineData.units, Validators.required),
          packing: new FormControl(this.medicineData.packing, Validators.required),
          description: new FormControl(this.medicineData.description),
          status: new FormControl(this.medicineData.status, Validators.required),
          updated: new FormControl(this.userId, Validators.required),

          // mName: new FormControl(this.medicineData.mName, Validators.required),
          // cId: new FormControl(this.medicineData.company.name, Validators.required),
          // mGeneric: new FormControl(this.medicineData.mGeneric, Validators.required),
          // mGroup: new FormControl(this.medicineData.mGroup, Validators.required),
          // mStoreBox: new FormControl(this.medicineData.mStoreBox, Validators.required),
          // mMinLevel: new FormControl(this.medicineData.mMinLevel, Validators.required),
          // mReorderLevel: new FormControl(this.medicineData.mReorderLevel, Validators.required),
          // mUnit: new FormControl(this.medicineData.mUnit, Validators.required),
          // mUnitPacking: new FormControl(this.medicineData.mUnitPacking, Validators.required),
          // mTax: new FormControl(this.medicineData.mTax, Validators.required),
          // mNote: new FormControl(this.medicineData.mNote, Validators.required),
          // mcId: new FormControl(this.medicineData.category.mcId, Validators.required),
          // hId: new FormControl(this.medicineData.hsn.code, Validators.required)
        });
      });
    });
  });
    }
  }

  CompanyFilter(event: any) {
    this.companyData.filter = event.target.value.trim().toLowerCase();
    this.company = this.companyData.filteredData;
    console.log(this.company);
  }

  companyId(id: number) {
    this.cId = id;
    this.medicineForm.value.companyId = id;
    console.log(this.cId);
  }
  CategoryFilter(event: any) {
    this.categoryData.filter = event.target.value.trim().toLowerCase();
    this.category = this.categoryData.filteredData;
  }

  categoryId(id: number) {
    this.catId = id;
    this.medicineForm.value.categoryId = this.catId;
    console.log(this.catId);
  }


  HSNFilter(event: any) {
    this.hsnData.filter = event.target.value.trim().toLowerCase();
    this.hsn = this.hsnData.filteredData;
    console.log(this.hsn);
  }

  HSNId(id: number) {
    this.hsnId = id;
    this.medicineForm.value.hsnId = this.hsnId;
    console.log(this.medicineForm.value.hsnId);
  }


  specialCategoryFilter(event: any) {
    this.specialCategoryData.filter = event.target.value.trim().toLowerCase();
    this.specialCategory = this.specialCategoryData.filteredData;
    console.log(this.specialCategory);
  }

  specialCategoryId(id: number) {
    this.specialCatId = id;
    this.medicineForm.value.specialCategory = id;
    console.log(this.cId);
  }
  scheduleCategoryFilter(event: any) {
    this.scheduleCategoryData.filter = event.target.value.trim().toLowerCase();
    this.scheduleCategory = this.scheduleCategoryData.filteredData;
  }

  scheduleCategoryId(id: number) {
    this.scheduleCatId = id;
    this.medicineForm.value.scheduleCategory = this.scheduleCatId;
    console.log(this.catId);
  }
  async onSubmit() {
    
    if (this.medicineForm.valid === false) {
      return;
    }
    console.log(this.medicineForm);
    
    this.medicineForm.value.companyId = this.cId;
    this.medicineForm.value.categoryId = this.catId;
    this.medicineForm.value.hsnId = this.hsnId;
    this.medicineForm.value.specialCategory = this.specialCatId;
    this.medicineForm.value.scheduleCategory = this.scheduleCatId;

    // this.medicineForm.value.packing = this.medicineForm.value.packing;
    // this.medicineForm.value.units = this.medicineForm.value.units;
   
    if (this.id) {

      this.medicinesService.updateMedicines(this.id, this.medicineForm.value).subscribe(data => {
        if (data) {
         
          this.snackBar.open('Product Updated Successfully!', 'Success', {
         
            duration: 2000,

            verticalPosition:'top',
            panelClass: ["custom-style"]

           

          });
          // this.showAlert=true;
          this.medicineForm.reset();
          this.router.navigate(['/admin/products']);
        }
      });
    }
    else {

      this.medicinesService.addMedicines(this.medicineForm.value).subscribe(data => {
        this.medicineData = data;
        if (data) {
          this.snackBar.open('Product Successfully Added!', 'Success', {

            duration: 2000,
            verticalPosition:'top',
            panelClass: ["custom-style"]
            

          });
          // this.showAlert=true;
          this.medicineForm.reset();
          this.router.navigate(['/admin/products']);
        }
      });
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

  keyPressAlpha(event) {
    let name= this.medicineForm.value.name.match(/(\b\S)?/g).join("").toUpperCase();
    this.medicineForm.get("shortName").setValue(name);
    let inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9-_@()*#:,/ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
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

  // getShortName(fullName) {
  //   return fullName.split(' ').map(n => n[0]).join('');
  // }
}


//   export declare interface PipeTransform {
//     transform(fullName: string) {
//       return fullName
//         .split(" ")
//         .map(n => n[0])
//         .join("");
//     }
// }



