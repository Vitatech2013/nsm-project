import { TaxesModel } from "./taxes.model";

export interface BatchModel {
    id: any;
    batchId:number;
    purchaseId:number;
    productId:number;
    batchNumber:number;
    name:string;
    shortName:string;
    packing:number;
    units:number;
    quantity:number;
    freeQuantity:number;
    availableQuantity:number;
    availableUnits:number
    mfgDate:string;
    expiryDate:string;
    mrp:number
    purPrice:number
    companyPtr:string;
    disType:string;
    discount:number;
    disAmount:number;
    hsnTypeId:number;
    gstValue:number;
    unitPrice:number;
    unitMrp:number;
    actualCostPrice:number
    margin:number;
    totalAmount:number
    status:boolean
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    udatedBy: number;
    product:{};
   

    hsn: number,
    gst: string,
    gstValue0:number,
    gstValue5:number,
    gstValue12:number,
    gstValue18:number,
    gstValue28:number,
//No Use
    mbId: number;
    mbName: string;
    mbBatch: string;
    mbExpiry: string;
    mbQuantity: number;
    mbSalePrice: number;
    mbPurchasePrice: number;
    mbDisccountType: string;
    mbDiscount: number;
    mbTax: string;
    mbTaxPrice: number;
    mbPrice: number;
    mId: number;
    pId: number;
    eId: number;
    mbCreatedAt: string;
    mbStatus: boolean;
    mbTaxes: TaxesModel[]
    



}

