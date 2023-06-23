export interface PurchaseModel {
    id: number;
    userId: number;
    purInvoiceNum: string;
    purchaseDate: Date;
    billType: string;
    amount: number;
    itemDisAmount: number;
    subTotal: number;
    taxAmount: number;
    totalAmount: number;
    disType: string;
    discount: number;
    disAmount: number;
    netAmount: number;
    paidAmount: number;
    dueAmount: number;
    description: string;
    status:boolean
    createdAt: string;
    created: number;
    updatedAt: string;
    udatedBy: number;
}

