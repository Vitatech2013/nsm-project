import { Companymodel } from './../../../shared/models/company.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  id: number;
  companyData: Companymodel | any;
  companyForm: FormGroup;
  employeeId: number;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.employeeId = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.intForm();

    this.companyForm = new FormGroup({
      company: new FormControl('', Validators.required),
      shortName: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.pattern(/^[6-9]\d{9}$/) ]),
      email: new FormControl('', [ Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      fax: new FormControl(''),
      pin: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      status: new FormControl(true, Validators.required),
      created: new FormControl(this.employeeId, Validators.required),
      updated: new FormControl(this.employeeId),
    });

  }

  intForm() {
    if (this.id) {
      this.companyService.getCompanyById(this.id).subscribe(data => {
        this.companyData = data;
        console.log(this.companyData);
        console.log(this.companyData.company);

        this.companyForm = this.formBuilder.group({
          id: new FormControl(this.companyData.id, Validators.required),
          company: new FormControl(this.companyData.company, Validators.required),
          shortName: new FormControl(this.companyData.shortName, Validators.required),
          phone: new FormControl(this.companyData.phone),
          email: new FormControl(this.companyData.email),
          fax: new FormControl(this.companyData.fax),
          city: new FormControl(this.companyData.city),
          pin: new FormControl(this.companyData.pin),
          address: new FormControl(this.companyData.address),
          status: new FormControl(this.companyData.status, Validators.required),
          created: new FormControl(this.companyData.created, Validators.required),
          updated: new FormControl(this.companyData.updated),
        });
      });
    }
    // else {
    //   this.companyForm = new FormGroup({
    //     company: new FormControl('', Validators.required),
    //     shortName: new FormControl('', Validators.required),
    //     phone: new FormControl('', [
    //       Validators.required,
    //       Validators.pattern(/^[6-9]\d{9}$/) ]),
    //     email: new FormControl('',[
    //       Validators.required, Validators.email,
    //       Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    //     ]),
    //     fax: new FormControl('', Validators.required),
    //     pin: new FormControl('', Validators.required),
    //     city: new FormControl('', Validators.required),
    //     address: new FormControl('', Validators.required),
    //     status: new FormControl(true, Validators.required),
    //     created: new FormControl(this.employeeId, Validators.required),
    //     updated: new FormControl(this.employeeId, Validators.required),
    //   });
    // }
  }

  onSubmit() {
    if (this.companyForm.valid === false){
      return;
    }
    if (!this.id) {
      this.companyService.addCompany(this.companyForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('Added Successfully!', 'Success', {
            duration: 2000,
          });
          this.companyForm.reset();
          this.router.navigate(['/admin/company']);
        }
      });
    }
    else {
       this.companyService.updateCompany(this.id, this.companyForm.value).subscribe(data => {
        if (data) {
            this.snackBar.open('Updated Successfully!', 'Success', {
            duration: 2000,
          });
            this.companyForm.reset();
            this.router.navigate(['/admin/company']);
        }
      });
    }
  }


  keyPressAlphaNumeric(event) {
    let name = this.companyForm.value.company.match(/(\b\S)?/g).join("").toUpperCase();
    this.companyForm.get("shortName").setValue(name);
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
  keyPressNumericFAX(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9+-]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}


