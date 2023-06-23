import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeRoleService } from 'src/app/shared/services/employee-role.service';

@Component({
  selector: 'app-add-employee-role',
  templateUrl: './add-employee-role.component.html',
  styleUrls: ['./add-employee-role.component.css']
})

export class AddEmployeeRoleComponent implements OnInit {
  id: any;
  roleData: any;
  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private employeeRoleService: EmployeeRoleService,
    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<AddEmployeeRoleComponent>) {
    simpleDialog.disableClose = true;
  }
  employeeRoleForm: FormGroup | any;
  ngOnInit(): void {
    this.employeeRoleForm = new FormGroup({
      role: new FormControl('', Validators.required),
      description: new FormControl('')
    });
    this.id = this.employeeRoleService.getter();
    this.employeeRoleService.getEmployeeRoleById(this.id).subscribe(data => {
      this.roleData = data;
      this.employeeRoleForm = this.formBuilder.group({
        role: new FormControl(this.roleData.role, Validators.required),
        description: new FormControl(this.roleData.description),
      });
    });
  }
  addEmployeeRole() {
    if (this.employeeRoleForm.valid === false){
      return;
    }
    if (!this.id) {
      this.employeeRoleService.addEmployeeRole(this.employeeRoleForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('EmployeeRole Added!', 'Success', {
            duration: 2000,
          });
          this.employeeRoleForm.reset();
          this.router.navigate(['/admin/employees/employee-role']);
        }
      });
    }
    else {
      this.employeeRoleService.updateEmployeeRole(this.id, this.employeeRoleForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('EmployeeRole Updated!', 'Success', {
            duration: 2000,
          });
          this.employeeRoleForm.reset();
          this.router.navigate(['/admin/employees/employee-role']);
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
