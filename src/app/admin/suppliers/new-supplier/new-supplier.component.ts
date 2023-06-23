import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeRoleModel } from 'src/app/shared/models/employee-role.model';
import { SupplierModel } from 'src/app/shared/models/supplier.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { EmployeeRoleService } from 'src/app/shared/services/employee-role.service';
import { SuppliersService } from 'src/app/shared/services/suppliers.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss']
})
export class NewSupplierComponent implements OnInit {
  Url = environment.root;

  id: number | any;
  suppliersData: SupplierModel | any;
  roleField = false;
  suppliersForm;
  checkbox1: any;
  reason: any;
  reasonForm: FormGroup;
  imagePath: string;
  imageName: any;
  imagePreview: string | ArrayBuffer;
  file: any;
  showImage: boolean;
  roles: EmployeeRoleModel | any;
  userData: UserModel | any;
  supplierData: SupplierModel | any;
  createdId: number;
  userId: number;
  disabled = false;
  key: any;
  constructor(
    private suppliersService: SuppliersService,
    private roleService: EmployeeRoleService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.reasonForm = this.formBuilder.group({
      blocked: [false],
    });

    this.suppliersForm = this.formBuilder.group({
      reason: [''],
    });

    this.reasonForm.valueChanges.subscribe((value) => {
      value.blocked ? this.suppliersForm.get('reason').enable() : this.suppliersForm.get('reason').disable();
    });
  }

  ngOnInit(): void {
    
    this.createdId = parseInt(window.localStorage.getItem('id'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.roleService.getEmployeeRole().subscribe((data) => {
      this.roles = data;
      this.roles.map(role => {

      if (role.role === 'Supplier'){

        this.roles = role;

      }

      });

    });
    this.suppliersForm = new FormGroup({
      roleId: new FormControl(4, Validators.required),
      fullName: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required),
      phone: new FormControl(''),
      mobile: new FormControl('', [
        Validators.pattern(/^[6-9]\d{9}$/),
      ]),
      email: new FormControl('', [Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      userId: new FormControl(this.createdId, Validators.required),
      contactPerson: new FormControl(''),
      blocked: new FormControl(''),
      reason: new FormControl(''),
      gstIn: new FormControl(''),
      regType: new FormControl(''),
      panNum: new FormControl(''),
      tanNum: new FormControl(''),
      state: new FormControl('', Validators.required),
      dlNum1: new FormControl(''),
      dlNum2: new FormControl(''),
      dlNum3: new FormControl(''),
      dlNum4: new FormControl(''),
      validUpto1: new FormControl(''),
      validUpto2: new FormControl(''),
      validUpto3: new FormControl(''),
      validUpto4: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      pin: new FormControl(''),
      created: new FormControl(this.createdId, Validators.required),
    });
    this.intForm();
  }

  async intForm() {
    if (this.id) {
      this.showImage = true;
      this.suppliersService.getSuppliersById(this.id).subscribe(data => {
        this.suppliersData = data;
        this.roleField = true;
        this.reasonForm = this.formBuilder.group({
          blocked: [this.suppliersData.blocked],
        });
        this.reasonForm.valueChanges.subscribe((value) => {
          value.blocked ? this.suppliersForm.get('reason').disable() : this.suppliersForm.get('reason').enable();
        });
        this.imagePath = this.suppliersData.user.image;
        this.userId = this.suppliersData.user.id;
        this.suppliersForm = this.formBuilder.group({
          roleId: new FormControl(this.suppliersData.user.role.id, Validators.required),
          fullName: new FormControl(this.suppliersData.user.fullName, Validators.required),
          phone: new FormControl(this.suppliersData.user.phone),
          email: new FormControl(this.suppliersData.user.email),
          mobile: new FormControl(this.suppliersData.user.mobile, Validators.required),
          shortName: new FormControl(this.suppliersData.shortName, Validators.required),
          contactPerson: new FormControl(this.suppliersData.contactPerson),
          blocked: new FormControl(this.suppliersData.blocked),
          reason: new FormControl(this.suppliersData.reason),
          gstIn: new FormControl(this.suppliersData.gstIn),
          regType: new FormControl(this.suppliersData.regType),
          panNum: new FormControl(this.suppliersData.panNum),
          state: new FormControl(this.suppliersData.state, Validators.required),
          dlNum1: new FormControl(this.suppliersData.dlNum1),
          dlNum2: new FormControl(this.suppliersData.dlNum2),
          dlNum3: new FormControl(this.suppliersData.dlNum3),
          dlNum4: new FormControl(this.suppliersData.dlNum4),
          validUpto1: new FormControl(this.suppliersData.validUpto1),
          validUpto2: new FormControl(this.suppliersData.validUpto2),
          validUpto3: new FormControl(this.suppliersData.validUpto3),
          validUpto4: new FormControl(this.suppliersData.validUpto4),
          address: new FormControl(this.suppliersData.address),
          city: new FormControl(this.suppliersData.city),
          pin: new FormControl(this.suppliersData.pin),
          updated: new FormControl(this.userId, Validators.required),
          tanNum: new FormControl(this.suppliersData.tanNum),
        });
      });
    }
  }


  moveToSelectedTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((document.querySelectorAll('.mat-tab-label-content')[i] as HTMLElement).innerText === tabName) {
        (document.querySelectorAll('.mat-tab-label')[i] as HTMLElement).click();
      }
    }
  }
  onFileSelected(event) {
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }
  updateImage(id: number) {
    const fb = new FormData();
    fb.append('image', this.file);
    this.userService.updateImage(id, fb).subscribe((resp) => {
    });
  }
  onSubmit() {

 if(this.suppliersForm.value.pin.length<=0){
  this.suppliersForm.value.pin=0
 }
    console.log(this.suppliersForm);
    if (this.suppliersForm.valid === false){
      this.snackBar.open('Please fill up the Mandatory fields', 'ok', {
        duration: 2000,
      });
      return;
    }
    if (this.id) {
      const userData = {
        fullName: this.suppliersForm.value.fullName,
        phone: this.suppliersForm.value.phone,
        email: this.suppliersForm.value.email,
        mobile: this.suppliersForm.value.mobile,
        updated: this.createdId
      };
      const supplierUpdatedData = {
        shortName: this.suppliersForm.value.shortName,
        contactPerson: this.suppliersForm.value.contactPerson,
        blocked: this.reasonForm.value.blocked,
        reason: this.suppliersForm.value.reason,
        gstIn: this.suppliersForm.value.gstIn,
        regType: this.suppliersForm.value.regType,
        panNum: this.suppliersForm.value.panNum,
        state: this.suppliersForm.value.state,
        dlNum1: this.suppliersForm.value.dlNum1,
        validUpto1: this.suppliersForm.value.validUpto1,
        dlNum2: this.suppliersForm.value.dlNum2,
        validUpto2: this.suppliersForm.value.validUpto2,
        dlNum3: this.suppliersForm.value.dlNum3,
        validUpto3: this.suppliersForm.value.validUpto3,
        dlNum4: this.suppliersForm.value.dlNum4,
        validUpto4: this.suppliersForm.value.validUpto4,
        city: this.suppliersForm.value.city,
        pin: parseInt(this.suppliersForm.value.pin),
        address: this.suppliersForm.value.address,
        tanNum: this.suppliersForm.value.tanNum
      };
      this.userService.updateUser(this.userId, userData).subscribe(data => {
        this.userData = data;
        this.updateImage(this.userId);
      });
      this.suppliersService.updateSuppliers(this.id, supplierUpdatedData).subscribe(data => {
        this.supplierData = data;
        if (data) {
          this.snackBar.open('Updated Successfully!', 'Success', {
            duration: 2000,
          });
          this.suppliersForm.reset();
          this.router.navigate(['/admin/suppliers']);
        }
      });
    }
    else {
      const userData = {
        roleId:this.roles.id,
        fullName: this.suppliersForm.value.fullName,
        phone: this.suppliersForm.value.phone,
        email: this.suppliersForm.value.email,
        mobile: this.suppliersForm.value.mobile,
        created: this.createdId
      };
      this.userService.addUser(userData).subscribe(data => {
        this.userData = data;
        this.updateImage(this.userData.id);
        const supplierData = {
          userId: this.userData.id,
          shortName: this.suppliersForm.value.shortName,
          contactPerson: this.suppliersForm.value.contactPerson,
          blocked: this.reasonForm.value.blocked,
          reason: this.suppliersForm.value.reason,
          gstIn: this.suppliersForm.value.gstIn,
          regType: this.suppliersForm.value.regType,
          panNum: this.suppliersForm.value.panNum,
          state: this.suppliersForm.value.state,
          dlNum1: this.suppliersForm.value.dlNum1,
          validUpto1: this.suppliersForm.value.validUpto1,
          dlNum2: this.suppliersForm.value.dlNum2,
          validUpto2: this.suppliersForm.value.validUpto2,
          dlNum3: this.suppliersForm.value.dlNum3,
          validUpto3: this.suppliersForm.value.validUpto3,
          dlNum4: this.suppliersForm.value.dlNum4,
          validUpto4: this.suppliersForm.value.validUpto4,
          city: this.suppliersForm.value.city,
        
          pin:parseInt(this.suppliersForm.value.pin),
          address: this.suppliersForm.value.address,
          tanNum: this.suppliersForm.value.tanNum
        };
        this.suppliersService.addSuppliers(supplierData).subscribe(data => {
          this.supplierData = data;
          if (data) {
            this.snackBar.open('Added Successfully!', 'Success', {
              duration: 2000,
            });
            this.suppliersForm.reset();
            this.router.navigate(['/admin/suppliers']);
          }
        });
      });
    }
  }


  keyPressAlphaNumeric(event) {
    const name = this.suppliersForm.value.fullName.match(/(\b\S)?/g).join('').toUpperCase();
    this.suppliersForm.get('shortName').setValue(name);
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressAlphaNumerical(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressAlpha(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9-_@()*#:,/ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressNumeric(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  panCardValidation(event) {
    this.key = event.target.value;
    let lblPANCard = document.getElementById('lblPANCard');
    const regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(this.key.toUpperCase())) {
        lblPANCard.style.visibility = 'hidden';
        this.suppliersForm.value.panNum = this.key.toUpperCase();
        return true;
      } else {
        lblPANCard.style.visibility = 'visible';
        return false;
    }
  }
  tanCardValidation(event) {
    this.key = event.target.value;
    let lblTANCard = document.getElementById('lblTANCard');
    const regex = /([A-Z]){4}([0-9]){5}([A-Z]){1}$/;
    if (regex.test(this.key.toUpperCase())) {
        lblTANCard.style.visibility = 'hidden';
        this.suppliersForm.value.panNum = this.key.toUpperCase();
        return true;
      } else {
        lblTANCard.style.visibility = 'visible';
        return false;
    }
  }
}
