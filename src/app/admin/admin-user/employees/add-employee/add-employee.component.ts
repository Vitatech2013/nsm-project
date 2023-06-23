import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mixinDisabled } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeRoleModel } from 'src/app/shared/models/employee-role.model';
import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { EmployeeRoleService } from 'src/app/shared/services/employee-role.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  Url = environment.root;
  employeeData: any;
  createdId: number;
  roles: EmployeeRoleModel | any;
  id: number | any;
  employeesData: EmployeeModel | any;
  userData: UserModel | any;
  roleField = false;
  userId: number;

  employeesForm = new FormGroup({
    roleId: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    phone: new FormControl(''),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    userId: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    gender: new FormControl(''),
    // bloodGroup: new FormControl(''),
    dob: new FormControl(''),
    // doj: new FormControl(''),
    address: new FormControl(''),
    image: new FormControl(''),
    status: new FormControl(true, Validators.required),
    created: new FormControl('', Validators.required),
  });
  EmployeeId: any;
  imagePath: string;
  imageName: any;
  showImage: boolean;
  imagePreview: string | ArrayBuffer;
  file: any;

  constructor(
    private employeeService: EmployeeService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private roleService: EmployeeRoleService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.roleService.getEmployeeRole().subscribe((data) => {
      this.roles = data;
      this.roles.map(role => {
      if (role.role === 'Employee'){
        this.roles = role;
      }
      });
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.createdId = parseInt(window.localStorage.getItem('id'));
    this.initForm();
  }
  initForm() {
    if (this.id) {
      this.showImage = true;
      this.employeeService.getEmployeesById(this.id).subscribe((data) => {
        this.roleField = true;
        this.employeesData = data;
        this.imagePath = this.employeesData.user.image;
        this.userId = this.employeesData.user.id;
        this.employeesForm = this.formBuilder.group({
          roleId: new FormControl(
            this.employeesData.user.role.id,
            Validators.required
          ),
          fullName: new FormControl(
            this.employeesData.user.fullName,
            Validators.required
          ),
          phone: new FormControl(this.employeesData.user.phone),
          email: new FormControl(this.employeesData.user.email),
          mobile: new FormControl(
            this.employeesData.user.mobile,
            Validators.required
          ),
          userName: new FormControl(
            this.employeesData.userName,
            Validators.required
          ),
          gender: new FormControl(this.employeesData.gender),
          dob: new FormControl(this.employeesData.dob),
          address: new FormControl(this.employeesData.address),
          image: new FormControl(this.employeesData.user.image),
          status: new FormControl(true, Validators.required),
          created: new FormControl('', Validators.required),
        });
      });
    }
  }
  onFileSelected(event) {
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.employeesForm.controls.image.setValue(this.file ? this.file : '');
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }
  updateImage(id: number) {
    const fb = new FormData();
    fb.append('image', this.file);
    this.userService.updateImage(id, fb).subscribe((resp) => {});
  }
  onSubmit() {
    console.log(this.employeesForm.value);
    console.log(this.id);
    if (this.id) {
      let userData = {
        fullName: this.employeesForm.value.fullName,
        phone: this.employeesForm.value.phone,
        email: this.employeesForm.value.email,
        mobile: this.employeesForm.value.mobile,
        updated: this.createdId,
      };
      let employeeUpdatedData = {
        userName: this.employeesForm.value.userName,
        gender: this.employeesForm.value.gender,
        dob: this.employeesForm.value.dob,
        address: this.employeesForm.value.address,
      };
      this.userService.updateUser(this.userId, userData).subscribe((data) => {
        this.userData = data;
        this.updateImage(this.userId);
      });
      this.employeeService
        .updateEmployee(this.id, employeeUpdatedData)
        .subscribe((data) => {
          this.employeesData = data;
          if (data) {
            this.snackBar.open('Updated Successfully!', 'Success', {
              duration: 2000,
            });
            this.router.navigate(['/admin/employees']);
          }
        });
    } else {
      let userData = {
        roleId: this.roles.id,
        fullName: this.employeesForm.value.fullName,
        phone: this.employeesForm.value.phone,
        email: this.employeesForm.value.email,
        mobile: this.employeesForm.value.mobile,
        created: this.createdId,
      };
      console.log(this.employeesForm.value);
      console.log(this.employeesForm.value.roleId, this.employeesForm.value.fullName,
        this.employeesForm.value.email, this.employeesForm.value.userName);

      if (this.employeesForm.value.fullName &&
        this.employeesForm.value.mobile && this.employeesForm.value.userName) {
        this.userService.addUser(userData).subscribe((data) => {
          this.userData = data;
          this.updateImage(this.userData.id);
          let employeeData = {
            userId: this.userData.id,
            password: '',
            userName: this.employeesForm.value.userName,
            gender: this.employeesForm.value.gender,
            dob: this.employeesForm.value.dob,
            address: this.employeesForm.value.address,
            created: this.createdId,
          };
          this.employeeService.addEmployees(employeeData).subscribe((data) => {
            this.employeesData = data;
            if (data) {
              this.snackBar.open('Added Successfully!', 'Success', {
                duration: 2000,
              });
              this.router.navigate(['/admin/employees']);
            }
          });
        });
      }
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
}
