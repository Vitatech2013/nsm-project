import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';

@Component({
  selector: 'app-new-payment-type',
  templateUrl: './new-payment-type.component.html',
  styleUrls: ['./new-payment-type.component.css']
})
export class NewPaymentTypeComponent implements OnInit {

  id: any;
  paymentTypeData: any;
  paymentTypeForm: any;
  created: number;
  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private paymentTypeService: PaymentTypeService,
    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<NewPaymentTypeComponent>) {
    simpleDialog.disableClose = true; }

  ngOnInit(): void {
    this.created = parseInt(window.localStorage.getItem('id'));

    this.paymentTypeForm = new FormGroup({
      paymentType: new FormControl('', Validators.required),
      description: new FormControl(''),
      created: new FormControl(this.created, Validators.required)

    });
    this.id = this.paymentTypeService.getter();
    this.paymentTypeService.getPaymentTypeById(this.id).subscribe(data => {
      this.paymentTypeData = data;
      this.paymentTypeForm = this.formBuilder.group({
        paymentType: new FormControl(this.paymentTypeData.paymentType, Validators.required),
        description: new FormControl(this.paymentTypeData.description),
        updated: new FormControl(this.created, Validators.required)
      });
    });
  }
  paymentType() {
    if (this.paymentTypeForm.valid === false){
      return;
    }
    if (!this.id) {
      this.paymentTypeService.addPaymentType(this.paymentTypeForm.value).subscribe(data => {
        console.log(data);
        if (data) {
          this.snackBar.open('PaymentType Added!', 'Success', {
            duration: 2000,
          });
          this.paymentTypeForm.reset();
          this.router.navigate(['/admin/payment-type']);

        }
      });
    }
    else {
      console.log(this.paymentTypeForm.value);
      this.paymentTypeService.updatePaymentType(this.id, this.paymentTypeForm.value).subscribe(data => {
        console.log(data);
        if (data) {
          this.snackBar.open('PaymentType Updated!', 'Success', {
            duration: 2000,
          });
          this.paymentTypeForm.reset();
          this.router.navigate(['/admin/payment-type']);

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
