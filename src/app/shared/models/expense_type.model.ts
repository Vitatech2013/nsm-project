export class ExpensesTypeModel {
    expenseTypeId: number;
    expenseType: string;
    description: string;
    status: boolean;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    udatedBy: number;
    constructor(
        expenseTypeId: number,
        expenseType: string,
        description: string,
        createdAt: string,
        createdBy: number,
        updatedAt: string,
        udatedBy: number,
        status: boolean,
    ) {
        this.expenseTypeId = expenseTypeId
        this.expenseType = expenseType
        this.description = description
        this.status = status
        this.createdAt = createdAt
        this.createdBy = createdBy
        this.updatedAt = updatedAt
        this.udatedBy = udatedBy


    }
}

