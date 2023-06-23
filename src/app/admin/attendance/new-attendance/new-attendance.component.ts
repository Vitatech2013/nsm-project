import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.css']
})
export class NewAttendanceComponent implements OnInit {
  allComplete: any;
  task: any;
  absentAllComplete: any;
  dataSource: any;
  isLoading!: boolean;
  totalLength = [10, 25, 50, 100];
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  usersForm: any
  minDate: Date;
  maxDate: Date;

  datee: string;
  employeeData: EmployeeModel[] | any
  attendanceArray = [];
  displayedColumns: string[] = [
    'id',
    // 'roleId',
    'userId', 'Persent',
    'Absent', 'Late', 'Holiday', 'OnLeave', 'description'

  ];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lateAllComplete: any;
  holidayAllComplete: any;
  onLeaveAllComplete: any;
  button: boolean;
  descriptiondata: string;
  AttendanceData: any;
  datedata: string;
  created: number;



  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private snackbar: MatSnackBar,
    private router: Router

  ) { }

  attendanceForm = new FormGroup({

    date: new FormControl('', Validators.required),
    //description: new FormControl('', Validators.required),

  });
  ngOnInit(): void {
    this.created = parseInt(window.localStorage.getItem('id'));

    this.button = false;
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 3, 24);
    this.maxDate = new Date();
   

    
  }
  getdata() {
    this.getAttendanceData();
    this.getEmployees();
   
  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employeeData = data
      console.log(this.employeeData);
      this.dataSource = new MatTableDataSource(this.employeeData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.length;
      this.button = true;
    })
  }
  getAttendanceData() {
    let year = this.attendanceForm.value.date._i.year;
    let month = this.attendanceForm.value.date._i.month + 1;
    let datee = this.attendanceForm.value.date._i.date;
    let date = year + '-' + month + '-' + datee;
    console.log(date)
    this.attendanceService.getAttendanceDataByDate(date).subscribe(data => {
      console.log(data)
      this.AttendanceData = data
      console.log( this.AttendanceData)
      for (let Attendance of this.AttendanceData) {
        console.log(Attendance);
        console.log(this.employeeData);
        for (let Employee of this.employeeData) {
          let employeeId = Employee.userId
          console.log(employeeId);
          let attendanceEmployeeId = Attendance.userId
          console.log(Employee.employeeId, employeeId, attendanceEmployeeId);
          if (employeeId === attendanceEmployeeId) {
            console.log('working');
            if (Attendance.attendance === "Absent" || Attendance.attendance === "Present" || Attendance.attendance === "Holiday" || Attendance.attendance === "Late" || Attendance.attendance === "OnLeave") {
              console.log("matched", Attendance.attendance);
              // this.attendanceForm = new FormGroup({
              //   Absent: new FormControl(Attendance.attendance, Validators.required),
              //   Holiday: new FormControl(Attendance.attendance, Validators.required)
              // });
            }
          }
          Employee++
        }


        Attendance++
      }

    })
  }
  Description(event) {
    this.descriptiondata = event.target.value
  }
  data(employeeId: number, userId: number, event) {
    const attendance = event.source.value;
    console.log(employeeId,userId,attendance);
    let year = this.attendanceForm.value.date._i.year;
    let month = this.attendanceForm.value.date._i.month + 1;
    let datee = this.attendanceForm.value.date._i.date;
    let date = year + '-' + month + '-' + datee;
    if (this.descriptiondata == " " || this.descriptiondata == undefined) {
      this.descriptiondata = "";
    console.log(this.descriptiondata);

    }else{
      const des = this.descriptiondata
      console.log(des);
    }
    const des = this.descriptiondata
    

    if (event.source.checked == true) {
      this.attendanceArray.push({
        employeeId,
        userId,
        des,
        attendance,
        date
      });
      this.descriptiondata = "";
    }
    else {
      this.attendanceArray = this.attendanceArray.filter((value, key) => {
        this.attendanceArray.splice(key, 1)
        return value.id !== employeeId;

      });
    }
  }
  insertData() {
    // for (let Attendance of this.AttendanceData) {
    //   console.log(this.AttendanceData);
      for (let a of this.attendanceArray) {
        console.log(this.attendanceArray);
        // const attendanceId=Attendance.id
        // console.log(attendanceId);
        //  const attendanceEmployeeId = Attendance.user.id;
        const employeeId = a.userId
        console.log(employeeId);
        //  console.log(attendanceEmployeeId);
        const counter = {
          userId: a.userId,
          date: a.date,
          attendance: a.attendance,
          discription: a.des,
          created:this.created
        };
        a++;
        // Attendance++
        // if (employeeId === attendanceEmployeeId) {
        //    console.log("counter");
        //    this.attendanceService.updateAttendance(attendanceId,counter).subscribe(data => {
        //     if (data) {
        //       this.snackbar.open('update Successfully!', 'Success', {
        //         duration: 2000,
        //       });
        //     }
        //   });
        //  }
        // else {
          console.log(counter);
          this.attendanceService.addAttendance(counter).subscribe(data => {
            if (data) {
              this.snackbar.open('Added Successfully!', 'Success', {
                duration: 2000,
              });
            }
          });
        }
       
      }
  //    }
  //  }
  updateAllComplete() {
    this.allComplete = this.employeeData != null && this.employeeData.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.employeeData == null) {
      return false;
    }
    return this.employeeData.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.employeeData == null) {
      return;
    }
    this.employeeData.forEach(t => t.completed = completed);
  }

  absentUpdateAllComplete() {
    this.absentAllComplete = this.employeeData != null && this.employeeData.every(t => t.absentCompleted);
  }

  absentSomeComplete(): boolean {
    if (this.employeeData == null) {
      return false;
    }
    return this.employeeData.filter(t => t.absentCompleted).length > 0 && !this.absentAllComplete;
  }
  absentSetAll(absentCompleted: boolean) {
    this.absentAllComplete = absentCompleted;
    if (this.employeeData == null) {
      return;
    }
    this.employeeData.forEach(t => t.absentCompleted = absentCompleted);
  }
  lateUpdateAllComplete() {
    this.lateAllComplete = this.employeeData != null && this.employeeData.every(t => t.lateCompleted);
  }
  lateSomeComplete(): boolean {
    if (this.employeeData == null) {
      return false;
    }
    return this.employeeData.filter(t => t.lateCompleted).length > 0 && !this.lateAllComplete;
  }
  lateSetAll(lateCompleted: boolean) {
    this.lateAllComplete = lateCompleted;
    if (this.employeeData == null) {
      return;
    }
    this.employeeData.forEach(t => t.lateCompleted = lateCompleted);
  }

  holidayUpdateAllComplete() {
    this.holidayAllComplete = this.employeeData != null && this.employeeData.every(t => t.holidayCompleted);
  }

  holidaySomeComplete(): boolean {
    if (this.employeeData == null) {
      return false;
    }
    return this.employeeData.filter(t => t.holidayCompleted).length > 0 && !this.holidayAllComplete;
  }

  holidaySetAll(holidayCompleted: boolean) {
    this.holidayAllComplete = holidayCompleted;
    if (this.employeeData == null) {
      return;
    }
    this.employeeData.forEach(t => t.holidayCompleted = holidayCompleted);
  }

  onLeaveUpdateAllComplete() {
    this.onLeaveAllComplete = this.employeeData != null && this.employeeData.every(t => t.onLeaveCompleted);
  }

  onLeaveSomeComplete(): boolean {
    if (this.employeeData == null) {
      return false;
    }
    return this.employeeData.filter(t => t.onLeaveCompleted).length > 0 && !this.onLeaveAllComplete;
  }

  onLeaveSetAll(onLeaveCompleted: boolean) {
    this.onLeaveAllComplete = onLeaveCompleted;
    if (this.employeeData == null) {
      return;
    }
    this.employeeData.forEach(t => t.onLeaveCompleted = onLeaveCompleted);
  }
}



