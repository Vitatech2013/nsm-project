export class CategoryModel {
    attendanceId: number;
    userId: number;
    date:string;
    attendance: string;
    discription:string;
    createdAt: string;
    createdBy:number
    status: boolean;
    constructor(
        attendanceId: number,
        userId: number,
        date:string,
        attendance: string,
        discription:string,
        createdAt: string, createdBy:number,
        status: boolean,
    ) {
        this.attendanceId = attendanceId
        this.userId = userId
        this.date=date
        this.attendance=attendance
        this.discription=discription
        this.createdAt = createdAt
        this.createdBy = createdBy
        this.status = status
    }
}