import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/core/services/auth.service';
import { EmployeeService } from '../shared/services/employee.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService, private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  otp: any;
  data: any;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  OTPForm: FormGroup;
  emailData: any;
  email: any;
  id: number;


  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.emailForm = new FormGroup({
      eMail: new FormControl('', Validators.required),
    });
    this.passwordForm = new FormGroup({
      ePassword: new FormControl('', Validators.required),
      cnfpassword: new FormControl('', Validators.required)
    });
    this.OTPForm = new FormGroup({
      otp: new FormControl('', Validators.required),
    });
  }

  sendOTP() {

    this.emailData = {
      email: this.emailForm.value.eMail,
      otp: 0
    };
    console.log(this.emailData);
    this.authService.SendOTP(this.emailData).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.email = this.data.email;
      this.otp = this.data.otp;
      console.log( this.email);

      if (this.data) {
        this.snackBar.open('OTP Sent To Your Mail!', 'Success', {
          duration: 2000,
        });
      }
    },
    (err) => this.errorHandler(err, 'Please Enter Valid Email'));
  }

  VerifyOTP() {
    const otpdata = {
      email: this.email,
      otp: parseInt(this.OTPForm.value.otp),
    };
    console.log(otpdata);
    this.authService.MatchOTP(otpdata).subscribe(data => {
      this.data = data;
      console.log(this.data);
      if (this.data){
        this.snackBar.open(this.data.messege, 'Success', {
          duration: 2000,
        });
      }
    },
    (err) => this.errorHandler(err, 'OTP Does Not Matched'));
  }

  UpdatePassword() {
    const updateData = {
      email: this.email,
      password: this.passwordForm.value.ePassword
    };
    this.authService.forgotPassword(updateData).subscribe(data => {
      if (this.data){
        if (this.passwordForm.value.ePassword === this.passwordForm.value.cnfpassword) {
          this.snackBar.open('Credentials Updated!', 'Success', {
            duration: 2000,
          });
        }
        else{
          this.snackBar.open('Please Confirm Your Password', 'Error', {
            duration: 2000,
          });
        }
      }
      },
      (err) => this.errorHandler(err, 'Password Update Failed!'));
  }


  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
