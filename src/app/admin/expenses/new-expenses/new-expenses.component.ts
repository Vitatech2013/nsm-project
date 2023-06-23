import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ExpenseTypeService } from 'src/app/shared/services/expense-type.service';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';
import { NewExpenseTypeComponent } from '../../expense-type/new-expense-type/new-expense-type.component';

@Component({
  selector: 'app-new-expenses',
  templateUrl: './new-expenses.component.html',
  styleUrls: ['./new-expenses.component.css'],
})
export class NewExpensesComponent implements OnInit {
  userId!: number | any;
  expensesForm!: FormGroup;
  expensesData: any;
  id: any;
  expenseType: any;
  paymentType: any;
  userid!: number | any;
  extype!: boolean;
  name = '';
  employeesData: any;
  employees: any;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private expensesService: ExpensesService,
    private expenseTypeService: ExpenseTypeService,
    private paymentTypeService: PaymentTypeService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    simpleDialog: MatDialogRef<NewExpenseTypeComponent>
  ) {
    simpleDialog.disableClose = true;
  }
  ngOnInit(): void {
    this.userId = parseInt(window.localStorage.getItem('id'));
    console.log(this.userId);
    this.getData();
    this.expensesForm = new FormGroup({
      name: new FormControl('', Validators.required),
      expenseTypeId: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      paymentTypeId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl(''),
      userId: new FormControl(this.userId, Validators.required),
      created: new FormControl(this.userId, Validators.required),
    });
    this.id = this.expensesService.getter();
    this.expensesService.getExpensesById(this.id).subscribe((data) => {
      this.expensesData = data;
      this.expensesForm = this.formBuilder.group({
        name: new FormControl(this.expensesData.name, Validators.required),
        expenseTypeId: new FormControl(
          this.expensesData.expenseType.id,
          Validators.required
        ),
        amount: new FormControl(this.expensesData.amount, Validators.required),
        paymentTypeId: new FormControl(
          this.expensesData.paymentType.id,
          Validators.required
        ),
        description: new FormControl(
          this.expensesData.description,
        ),
        date: new FormControl(this.expensesData.date, Validators.required),
        userId: new FormControl(this.userId, Validators.required),
        updated: new FormControl(this.userId, Validators.required),
      });
    });
    this.employeeService.getEmployees().subscribe((data) => {
      console.log(data);
      this.employeesData = data;
      this.employeesData = new MatTableDataSource(this.employeesData);
    });
  }
  getData() {
    this.expenseTypeService.getExpenseType().subscribe((data) => {
      this.expenseType = data;
    });
    this.paymentTypeService.getPaymentType().subscribe((data) => {
      this.paymentType = data;
    });
  }
  expenses() {
    const amount = parseInt(this.expensesForm.value.amount);
    this.expensesForm.value.amount = amount;
    if (this.expensesForm.valid === false){
      return;
    }
    if (!this.id) {
      console.log(this.expensesForm.value);
      this.expensesService
        .addExpenses(this.expensesForm.value)
        .subscribe((data) => {
          console.log(data);
          if (data) {
            this.snackBar.open('Expenses Added!', 'Success', {
              duration: 2000,
            });
            this.expensesForm.reset();
          }
        });
    } else {
      this.expensesService
        .updateExpenses(this.id, this.expensesForm.value)
        .subscribe((data) => {
          console.log(data);
          if (data) {
            this.snackBar.open('Expenses Updated!', 'Success', {
              duration: 2000,
            });
            this.expensesForm.reset();
          }
        });
    }
  }

  expensesFilter(event: any) {
    if (this.expensesForm.value.expenseTypeId === 1) {
      this.employeesData.filter = event.target.value.trim().toLowerCase();
      this.employees = this.employeesData.filteredData;
    } else {
      this.employees = null;
    }
  }

  expensesId(id: number) {
    this.employeeService.getEmployeesById(id).subscribe((data) => {
      console.log(data);
      this.expensesData = data;
    });
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
  keyPressNumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
