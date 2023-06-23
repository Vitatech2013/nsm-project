import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeRoleModel } from 'src/app/shared/models/employee-role.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { EmployeeRoleService } from 'src/app/shared/services/employee-role.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent implements OnInit {
  Url = environment.root;
  imageName: any;
  EmployeeId: number | any;
  id: number | any;
  imagePreview: string | any;
  doctorsData: any;
  doctorssData: any;
  file: any;
  roleField = false;
  showImage: boolean;
  roles: EmployeeRoleModel | any;
  userData: UserModel | any;
  doctorData: DoctorsService | any;
  createdId: number;
  userId: number;
  imagePath: string;


  doctorsForm = new FormGroup({
    roleId: new FormControl(2, Validators.required),
    fullName: new FormControl('', Validators.required),
    phone: new FormControl(''),
    mobile: new FormControl('', [
      Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    email: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    userId: new FormControl(''),
    hospital: new FormControl(''),
    gender: new FormControl(''),
    qualification: new FormControl(''),
    designation: new FormControl(''),
    specialist: new FormControl(''),
    status: new FormControl(true),
  });

  constructor(
    private doctorsService: DoctorsService,
    private userService: UserService,
    private roleService: EmployeeRoleService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roleService.getEmployeeRole().subscribe((data) => {
      this.roles = data;
      this.roles.map(role => {
      if (role.role === 'Doctor'){
        this.roles = role;
      }
      });
    });
    this.createdId = parseInt(window.localStorage.getItem('id'));

    this.getData();
  }

  getData() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.showImage = true;
      this.doctorsService.getDoctorsById(this.id).subscribe((data) => {
      console.log(data);
      this.roleField = true;
      this.doctorssData = data;
      this.imagePath = this.doctorssData.user.image;
      this.userId = this.doctorssData.user.id;
      this.doctorsForm = new FormGroup({
          userId: new FormControl(this.doctorssData.user.id, Validators.required),
          roleId: new FormControl(this.doctorssData.user.role.id, Validators.required),
          fullName: new FormControl(this.doctorssData.user.fullName, Validators.required),
          phone: new FormControl(this.doctorssData.user.phone),
          email: new FormControl(this.doctorssData.user.email),
          mobile: new FormControl(this.doctorssData.user.mobile),
          hospital: new FormControl(this.doctorssData.hospital),
          gender: new FormControl(this.doctorssData.gender),
          qualification: new FormControl(this.doctorssData.qualification),
          designation: new FormControl(this.doctorssData.designation),
          specialist: new FormControl(this.doctorssData.specialist),
          status: new FormControl(this.doctorssData.user.status)
        });
      });
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
    if (this.id) {
      console.log(this.doctorsForm);
      if (this.doctorsForm.status === 'INVALID'){
        return;
      }
      const userData = {
                fullName: this.doctorsForm.value.fullName,
                phone: this.doctorsForm.value.phone,
                email: this.doctorsForm.value.email,
                mobile: this.doctorsForm.value.mobile,
                updated: this.createdId
              };
      const employeeUpdatedData = {
                hospital: this.doctorsForm.value.hospital,
                  gender: this.doctorsForm.value.gender,
                  qualification: this.doctorsForm.value.qualification,
                  designation: this.doctorsForm.value.designation,
                  specialist: this.doctorsForm.value.specialist,
              };
      this.userService.updateUser(this.userId, userData).subscribe(data => {
                this.userData = data;
                this.updateImage(this.userId);
              });
      this.doctorsService.updateDoctors(this.id, employeeUpdatedData).subscribe(data => {
                this.doctorData = data;
                if (data) {
                  this.snackBar.open('Updated Successfully!', 'Success', {
                    duration: 2000,
                  });
                  this.doctorsForm.reset();
                  this.router.navigate(['/admin/doctors']);
                }
              });
    }
    else {
      const userData = {
        roleId: this.roles.id,
        fullName: this.doctorsForm.value.fullName,
        phone: this.doctorsForm.value.phone,
        email: this.doctorsForm.value.email,
        mobile: this.doctorsForm.value.mobile,
        created: this.createdId
      };
      console.log(this.doctorsForm);
      if (this.doctorsForm.value.fullName) {
        this.userService.addUser(userData).subscribe(data => {
          console.log(data);
          this.userData = data;
          this.updateImage(this.userData.id);
          this.doctorsForm.value.userId = this.userData.id;
          if (this.doctorsForm.value.userId) {
          console.log(this.doctorsForm);
          this.doctorsService.addDoctors(this.doctorsForm.value).subscribe(data => {
            console.log(this.doctorsForm.value.userId);
            this.doctorData = data;
            if (data) {
              this.snackBar.open('Added Successfully!', 'Success', {
                duration: 2000,
              });
              this.router.navigate(['/admin/doctors']);
            }
          });
          }
        });
      }
    }
  }

  keyPressAlphaNumeric(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
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
}
