import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HsnTypeService } from 'src/app/shared/services/hsn-type.service';
import { HsnService } from 'src/app/shared/services/hsn.service';

@Component({
  selector: 'app-add-hsn',
  templateUrl: './add-hsn.component.html',
  styleUrls: ['./add-hsn.component.css']
})
export class AddHSNComponent implements OnInit {
  id: any;
  hsnData: any;
  hsnForm: any;
  employeeId: any;
  hsnType: any;

  constructor(
    private snackBar: MatSnackBar,
    private hsnService: HsnService,
    private hsnTypeService: HsnTypeService,

    private formBuilder: FormBuilder,
    simpleDialog: MatDialogRef<AddHSNComponent>
    ) {
    simpleDialog.disableClose = true;
  }

  ngOnInit(): void {
    this.hsnTypeService.getHsnTyp().subscribe(data => {
      this.hsnType = data
      console.log(this.hsnType);
    })
    this.employeeId = parseInt(window.localStorage.getItem('id'));
    this.hsnForm = new FormGroup({
      code: new FormControl('', Validators.required),
      hsnTypeId: new FormControl('', Validators.required),
      gst: new FormControl(''),
      gst2: new FormControl(''),
      status: new FormControl(true, Validators.required),
      created: new FormControl(this.employeeId, Validators.required)
    });
    this.id = this.hsnService.getter();
    this.hsnService.getHSNById(this.id).subscribe(data => {
      this.hsnData = data;
      this.hsnForm = this.formBuilder.group({
        code: new FormControl(this.hsnData.code, Validators.required),
        hsnTypeId: new FormControl(this.hsnData.hsnType.id, Validators.required),
        gst: new FormControl(this.hsnData.gst),
        gst2: new FormControl(this.hsnData.gst2),
        status: new FormControl(this.hsnData.status, Validators.required),
        updated: new FormControl(this.employeeId, Validators.required),
      });
    });
  }
  AddHSN() {

    const code = parseInt(this.hsnForm.value.code);
    this.hsnForm.value.code = code;
    console.log(this.hsnForm.value);
    if (this.hsnForm.valid === false){
      return;
    }
    if (!this.id) {
      console.log(this.hsnType.id);
      this.hsnService.addHSN(this.hsnForm.value).subscribe(data => {
        if (data) {
          this.snackBar.open('HSN Added!', 'Success', {
            duration: 2000,
          });
          this.hsnForm.reset();
        }
      });
    }
    else {
      console.log(this.hsnForm.value.hsnTypeId);
      this.hsnService.updateHSN(this.id, this.hsnForm.value).subscribe(data => {
        console.log(data);
        if (data) {
          this.snackBar.open('HSN Updated!', 'Success', {
            duration: 2000,
          });
          this.hsnForm.reset();

        }
      });
    }
  }

  keyPressAlpha(event) {
    let inp = String.fromCharCode(event.keyCode);
    if (/[0-9%.]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressNumeric(event) {
    let inp = String.fromCharCode(event.keyCode);
    if (/[0-9a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


}
