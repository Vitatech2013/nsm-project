export class PaymentTypeModel {
    paymentTypeId: number;
    paymentType: string;
    description: string;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    udatedBy: number;
    status: boolean;
    constructor(
        paymentTypeId: number,
        paymentType: string,
        description: string,
        createdAt: string,
        createdBy: number,
        updatedAt: string,
        udatedBy: number,
        status: boolean
    ) {
        this.paymentTypeId = paymentTypeId
        this.paymentType = paymentType
        this.description = description
        this.createdAt = createdAt
        this.createdBy = createdBy
        this.updatedAt = updatedAt
        this.udatedBy = udatedBy
        this.status = status
    }
}