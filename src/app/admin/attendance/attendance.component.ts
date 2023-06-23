import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  displayedColumns: string[] = [
    
    'id',
    'date',
    'userId',
    'attendance',
     'discription',
  ];

  isLoading!: boolean;
  dataSource: any;
  data: any;
  id!: number;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  doctorsForm: any;
  attendanceData: any;
  totalLength = [5,10, 25, 50, 100];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor( private snackbar: MatSnackBar,
               private attendanceService: AttendanceService,
               private employeeService: EmployeeService,
               private router: Router, ) { }

  ngOnInit(): void {
    this.ReadAttendanceDetails()
  }
  ReadAttendanceDetails() {
     this.attendanceService.getAttendanceByDate().subscribe(data => {
      console.log(data);
      this.attendanceData = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.attendanceData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }

  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "AttendanceData";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  }

  exportTable() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
    const dataToExport = this.dataSource.filteredData
      .map(x => ({
        UserName: x.user.fullName,
        Date: x.date,
        Attendance: x.attendance,
        Discription : x.discription,
      }));

    let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts> { sheet: 'Sheet 1' });
    let workBook: XLSX.WorkBook = XLSX.utils.book_new();

    // Adjust column width
    var wscols = [
      { wch: 15}
    ];

    workSheet["!cols"] = wscols;
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
    XLSX.writeFile(workBook, `AttendanceData.xlsx`);
  }
}


  downloadPDF() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
    var prepare = [];
    this.attendanceData.forEach((e) => {
      var tempObj = [];
      tempObj.push(e.date);
      tempObj.push(e.user.fullName);
      tempObj.push(e.attendance);
      tempObj.push(e.discription);
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [
        [
        'Date',
        'UserName',
        'Attendance',
        'Discription'],
      ],
      body: prepare,
    });
    doc.save('AttendanceData.pdf');
  }
}


  applyFilter(event: any) {
    this.dataSource.filter =  event.target.value.trim().toLowerCase();
  }

}
