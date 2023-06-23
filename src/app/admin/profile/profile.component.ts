import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dataLoader } from '@amcharts/amcharts4/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Url = environment.root;
  imagePreview: string | ArrayBuffer;
  imageName: any;
  id: number;
  username: string;
  fullName: string;
  imagepath: string;
  status: boolean;
  role: string;
  employee: EmployeeModel[] | any;
  imagePath: string;
  file: File = null;
  employeeData: any;
  confirmPassword: string;
  changePasswordForm;

  employeesForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    email: new FormControl('', [ Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    gender: new FormControl(''),
    // blood: new FormControl(''),
    // doj: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    // image: new FormControl(''),
    status: new FormControl(true, Validators.required),
    createdBy: new FormControl('', Validators.required),
  });

  constructor(
    private employeeService: EmployeeService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.id = parseInt(window.localStorage.getItem('id'));
    console.log(this.id);

    if (this.id) {
      this.employeeService.getEmployeesById(this.id).subscribe(data => {
        this.employee = data;
        console.log(data);

        this.imagePath = this.employee.user.image;
        this.fullName = this.employee.user.fullName;
        this.role = this.employee.user.role.role;
        this.employeesForm = this.formBuilder.group({
          fullName: new FormControl(this.employee.user.fullName, Validators.required),
          userName: new FormControl(this.employee.userName, Validators.required),
          mobile: new FormControl(this.employee.user.mobile),
          email: new FormControl(this.employee.user.email),
          gender: new FormControl(this.employee.gender),
          status: new FormControl(this.employee.user.status, Validators.required),
          address: new FormControl(this.employee.address),
          // blood: new FormControl(this.employee.bloodGroup),
          dob: new FormControl(this.employee.getDoctorsById),
          // doj: new FormControl(this.employee.doj),
          // image: new FormControl(this.employee.user.image),
        });
      });
    }
    this.changePasswordsForm();
  }

  changePasswordsForm() {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      // updatedBy: new FormControl(this.id),
    });
  }
  changePassword() {
   
    if (this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword) {
      this.employeeService.changePassword(this.id,  this.changePasswordForm.value).subscribe(data => {
        console.log(data);
        this.snackBar.open('Password Updated!', 'Success', {
          duration: 2000,
        });
      },
        (err) => this.errorHandler(err, "Old password can't be matched"));
    }
    else {
      this.snackBar.open("Please match confirm password", 'Error', {
        duration: 2000,
      });
    }
  }

  private errorHandler(error: any, message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }

  onFileSelected(event) {
    console.log(event.target.files[0].name);
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.employeesForm.controls.Image.setValue(this.file ? this.file : '');
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  Submit(id: number) {
    const fb = new FormData();
    fb.append('imagepath', this.file);
    // this.employeeService.updateImage(id, fb).subscribe((resp) => {
    //   console.log(resp);
    // });
  }

  employeeUpdate() {
    if (this.employeesForm.valid === false){
      return;
    }
    this.Submit(this.id);
    let userData = {
        fullName: this.employeesForm.value.fullName,
        // phone: this.employeesForm.value.phone,
        email: this.employeesForm.value.email,
        mobile: this.employeesForm.value.mobile,
        updated: this.id
      };
    let employeeUpdatedData = {
        dob: this.employeesForm.value.dob,
        // doj: this.employeesForm.value.doj,
        // bloodGroup: this.employeesForm.value.bloodGroup,
        address: this.employeesForm.value.address,
        gender: this.employeesForm.value.gender,
       
      };
    this.userService.updateUser(this.id, userData).subscribe(data => {
    this.employeeService.updateEmployee(this.employee.id, employeeUpdatedData).subscribe((data) => {
      if (data) {
        this.employeeData = data;
        this.snackBar.open('Profile Updated!', 'Success', {
          duration: 2000,
        });
      }
      });
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

  keyPressAlpha(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9-_@()*#:,/ ]/.test(inp)) {
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
  keyPressAlphaNumerical(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
