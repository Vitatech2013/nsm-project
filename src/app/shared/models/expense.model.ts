export class ExpenseModel {
    expenseId: number;
    expenseTypeId: number
    userId: number;
    name: string;
    amount: number;
    date: string;
    paymentTypeId: number;
    description: string;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    udatedBy: number;

    constructor(
        expenseId: number,
        expenseTypeId: number,
        userId: number,
        name: string,
        amount: number,
        date: string,
        paymentTypeId: number,
        description: string,
        createdAt: string,
        createdBy: number,
        updatedAt: string,
        udatedBy: number,
    ) {
        this.expenseId = expenseId
        this.expenseTypeId = expenseTypeId
        this.userId = userId
        this.name = name
        this.amount = amount
        this.date = date
        this.paymentTypeId = paymentTypeId
        this.description = description
        this.createdAt = createdAt
        this.createdBy = createdBy
        this.updatedAt = updatedAt
        this.udatedBy = udatedBy

    }
}

