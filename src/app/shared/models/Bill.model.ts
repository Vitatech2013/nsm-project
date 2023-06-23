export class BillModel {
    id: number;
    invoiceNum:number
    name: string;
    mobile: string;
    doctorId: number;
    itemDisAmount  : number
    subTotal: string;
    disType: string;
    discount: string;
    disAmount:number
    afterDisAmount:number;
    taxAmount:number;
    netAmount:number;
    totalAmount  : number;
    description: string;
    status: boolean;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    udatedBy: number;
   
    // constructor(
    //     bId: number,
    //     bName: string,
    //     bMail: string,
    //     bMobile: string,
    //     bDoctor: string,
    //     bDate: string,
    //     bItems  : string,
    //     bSubTotal: string,
    //     bDisccountType: string,
    //     bDiscount: string,
    //     bTotal  : string,
    //     bNote: string,
    //     dId: number,
    //     cId: number, 
    //     eId: number,
    //     bCreatedAt: string,
    //     bStatus: boolean,
    // ) {
    //     this.bId = bId
    //     this.bName = bName
    //     this.bMail = bMail
    //     this.bMobile = bMobile
    //     this.bDoctor = bDoctor
    //     this.bDate = bDate
    //     this.bItems = bItems
    //     this.bSubTotal = bSubTotal
    //     this.bDisccountType = bDisccountType
    //     this.bDiscount = bDiscount
    //     this.bTotal = bTotal
    //     this.bNote=bNote
    //     this.dId = dId
    //     this.cId = cId
    //     this.eId = eId
    //     this.bCreatedAt = bCreatedAt
    //     this.bStatus = bStatus
    // }
}

