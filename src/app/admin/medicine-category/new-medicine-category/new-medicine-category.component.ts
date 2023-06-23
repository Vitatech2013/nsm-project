import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { MedicineCategoryService } from 'src/app/shared/services/medicine-category.service';

@Component({
  selector: 'app-new-medicine-category',
  templateUrl: './new-medicine-category.component.html',
  styleUrls: ['./new-medicine-category.component.css']
})
export class NewMedicineCategoryComponent implements OnInit {
  id: number | any;
  createdId:number;
  categoryData: CategoryModel | any;
  medicineCategoryForm = new FormGroup({
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  constructor(
    private medicineCategoryService: MedicineCategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private simpleDialog: MatDialogRef<NewMedicineCategoryComponent>,
    ) {
      simpleDialog.disableClose = true;
    }

  ngOnInit(): void {
    this.id = this.medicineCategoryService.getter();
    this.createdId =  parseInt(window.localStorage.getItem('id'));
    this.initForm()
  }
  initForm() {
    
    if (this.id) {
      this.medicineCategoryService.getCategoryById(this.id).subscribe(data => {
        this.categoryData = data;
        this.medicineCategoryForm = this.formBuilder.group({
          category: new FormControl(this.categoryData.category, Validators.required),
          description: new FormControl(this.categoryData.description),
          updated: new FormControl(this.createdId)
        });
      });
     
    }
    else {
      this.medicineCategoryForm = this.formBuilder.group({
        category: new FormControl('', Validators.required),
        description: new FormControl(''),
        created: new FormControl(this.createdId)
      });
    }
  }

  onSubmit() {
    if (this.medicineCategoryForm.valid === false){
      return;
    }
    console.log(this.medicineCategoryForm);
    if (this.id) {
      this.medicineCategoryService.updateCategory(this.id, this.medicineCategoryForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('Category Updated!', 'Success', {
            duration: 2000,
          });
          this.medicineCategoryForm.reset();
          this.router.navigate(['/admin/medicine-category']);
        }
      });
    }
    else {
      console.log(this.medicineCategoryForm.value);
      
      this.medicineCategoryService.addCategory(this.medicineCategoryForm.value).subscribe(data => {
        console.log(data);
        
        if (data) {
          this.snackBar.open('Category Added!', 'Success', {
            duration: 2000,
          });
          this.medicineCategoryForm.reset();
          this.router.navigate(['/admin/medicine-category']);
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
}
