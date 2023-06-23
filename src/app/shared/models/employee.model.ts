export class EmployeeModel {
    eId: number;
    rId: number;
    eUserName: string;
    ePassword: string;
    eFirstName: string;
    eLastName: string;
    eMail: string;
    eMobile: string;
    eImage: string;
    eGender: string;
    eAddress: string;
    eCountry: string;
    eBlood: string;
    eDofB: string;
    eCreatedAt: string;
    eStatus: boolean;
    otp: number;

    constructor(
        eId: number,
        rId: number,
        eUserName: string,
        ePassword: string,
        eFirstName: string,
        eLastName: string,
        eMail: string,
        eMobile: string,
        eImage: string,
        eGender: string,
        eAddress: string,
        eCountry: string,
        eBlood: string,
        eDofB: string,
        eCreatedAt: string,
        eStatus: boolean,
        otp: number
    ) {
        this.eId = eId;
        this.rId = rId;
        this.eUserName = eUserName;
        this.ePassword = ePassword;
        this.eFirstName = eFirstName;
        this.eLastName = eLastName;
        this.eMail = eMail;
        this.eMobile = eMobile;
        this.eImage = eImage;
        this.eGender = eGender;
        this.eAddress = eAddress;
        this.eCountry = eCountry;
        this.eBlood = eBlood;
        this.eDofB = eDofB;
        this.eCreatedAt = eCreatedAt;
        this.eStatus = eStatus;
        this.otp = otp;
    }
}

