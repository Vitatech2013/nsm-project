import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExpenseTypeService } from 'src/app/shared/services/expense-type.service';

@Component({
  selector: 'app-new-expense-type',
  templateUrl: './new-expense-type.component.html',
  styleUrls: ['./new-expense-type.component.css']
})
export class NewExpenseTypeComponent implements OnInit {

  id: any;
  expensesTypeData: any;
  expensesTypeForm: any;
  createdById: number;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private expenseTypeService: ExpenseTypeService,
    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<NewExpenseTypeComponent>) {
    simpleDialog.disableClose = true;
  }

  ngOnInit(): void {
    this.createdById = parseInt(window.localStorage.getItem('id'));
    this.expensesTypeForm = new FormGroup({
      expenseType: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl(true, Validators.required),
      created: new FormControl(this.createdById, Validators.required),
    });
    this.id = this.expenseTypeService.getter();
    this.expenseTypeService.getExpenseTypeById(this.id).subscribe(data => {
      this.expensesTypeData = data;
      this.expensesTypeForm = this.formBuilder.group({
        expenseType: new FormControl(this.expensesTypeData.expenseType, Validators.required),
        description: new FormControl(this.expensesTypeData.description),
      updated: new FormControl(this.createdById, Validators.required),

      });
    });
  }
  expensesType() {
    if (this.expensesTypeForm.valid === false){
      return;
    }
    if (!this.id) {
      this.expenseTypeService.addExpenseType(this.expensesTypeForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('ExpensesType Added!', 'Success', {
            duration: 2000,
          });
          this.expensesTypeForm.reset();
        }
      });
    }
    else {
      this.expenseTypeService.updateExpenseType(this.id, this.expensesTypeForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('ExpensesType Updated!', 'Success', {
            duration: 2000,
          });
          this.expensesTypeForm.reset();
        }
      });
    }
  }
  keyPressAlphaNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
