export class CustomersModel {
    cId: number;
    cFirstName: string;
    cLastName: string;
    cMail: string;
    cMobile: string;
    cGender: string;
    cAddress: string;
    cBlood: string;
    cDofB: string;
    eId: number;
    cCreatedAt: string;
    cStatus: boolean;

    constructor(
        cId: number,
        cFirstName: string,
        cLastName: string,
        cMail: string,
        cMobile: string,
        cGender: string,
        cAddress: string,
        cBlood: string,
        cDofB: string,
        eId: number,
        cCreatedAt: string,
        cStatus: boolean,
    ) {
        this.cId = cId
        this.cFirstName = cFirstName
        this.cLastName = cLastName
        this.cMail = cMail
        this.cMobile = cMobile
        this.cGender = cGender
        this.cAddress = cAddress
        this.cBlood = cBlood
        this.cDofB = cDofB
        this.eId = eId
        this.cCreatedAt = cCreatedAt
        this.cStatus = cStatus
    }
}

