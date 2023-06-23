import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BalanceSheetService } from 'src/app/shared/services/balance-sheet.service';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';

@Component({
  selector: 'app-add-balance-sheet',
  templateUrl: './add-balance-sheet.component.html',
  styleUrls: ['./add-balance-sheet.component.css']
})
export class AddBalanceSheetComponent implements OnInit {
  userId!: number | any;
  balanceForm!: FormGroup;
  balanceData: any;
  id: any;
  expenseType: any;
  paymentType: any;
  userid!: number | any;
  extype!: boolean;
  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private balanceSheetService: BalanceSheetService,
    
    private paymentTypeService: PaymentTypeService,
    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<AddBalanceSheetComponent>) {
    simpleDialog.disableClose = true;
  }

  ngOnInit(): void {
    this.userid = window.localStorage.getItem('id');
    this.userId = parseInt(this.userid)
    //this.extype = false
    this.getData();
    this.balanceForm = new FormGroup({
      credit: new FormControl('', Validators.required),
      debit: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
      paymentTypeId: new FormControl('', Validators.required),
      invoiceNumbers: new FormControl('', Validators.required),
      description: new FormControl(''),
      userId: new FormControl(this.userId, Validators.required)
    });
    this.id = this.balanceSheetService.getter();
    this.balanceSheetService.getBalanceSheetById(this.id).subscribe(data => {
      //this.extype = true
      this.balanceData = data;
      this.balanceForm = this.formBuilder.group({
        credit: new FormControl(this.balanceData.credit, Validators.required),
        debit: new FormControl(this.balanceData.debit, Validators.required),
        balance: new FormControl(this.balanceData.balance, Validators.required),
        paymentTypeId: new FormControl(this.balanceData.paymentType.paymentTypeId, Validators.required),
        description: new FormControl(this.balanceData.description),
        invoiceNumbers: new FormControl(this.balanceData.invoiceNumbers, Validators.required),
        userId: new FormControl(this.userId, Validators.required),
      });
    });
  }
  getData() {
    // this.expenseTypeService.getExpenseType().subscribe(data => {
    //   this.expenseType = data
    // })
    this.paymentTypeService.getPaymentType().subscribe(data => {
      this.paymentType = data
    })
  }
  expenses() {
    if (!this.id) {
      console.log(this.balanceForm.value);
      this.balanceSheetService.addBalanceSheet(this.balanceForm.value).subscribe(data => {
        console.log(data);
        if (data) {
          this.snackBar.open('Expenses Added!', 'Success', {
            duration: 2000,
          });
          this.balanceForm.reset();
         
        }
      });
    }
    else {
      this.balanceSheetService.updateBalanceSheet(this.id, this.balanceForm.value).subscribe(data => {
        console.log(data);
        if (data) {
          this.snackBar.open('Expenses Updated!', 'Success', {
            duration: 2000,
          });
          this.balanceForm.reset();
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

