import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from 'src/app/shared/services/attendance.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  attendanceData: any;
  attendanceForm: any;
  isLoading!: boolean;
  dataSource: any;
  data: any;
  eId!: any;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  doctorsForm: any;
  totalLength = [5,10, 25, 50, 100];
  displayedColumns1: string[] = [
    'id',
    'date',
    'attendance',
    'discription',
    // 'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  username: any;
  Mobile: any;
  Role: any;
  
  constructor(private attendanceService: AttendanceService, private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eId = this.route.snapshot.paramMap.get('id');
    console.log(this.eId);
    this.getAttendanceData();
   
}
getAttendanceData(){
  this.attendanceService.getAttendanceByEid(this.eId).subscribe(data => {
    this.attendanceData=data;
    console.log(this.attendanceData);
     this.username = this.attendanceData[0].user.fullName
     this.Mobile = this.attendanceData[0].user.mobile
     this.Role = this.attendanceData[0].user.role.role
    this.dataSource = data;
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.total = this.dataSource.length;
})
}
applyFilter(event: any) {
  this.dataSource.filter =  event.target.value.trim().toLowerCase();
}
}



