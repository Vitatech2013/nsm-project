export class DoctorsModel {
    dId: number;
    dFirstName: string;
    dLastName: string;
    dMail: string;
    dMobile: string;
    dImage: string;
    dGender: string;
    dAddress: string;
    eId: number
    dCreatedAt: string;
    dStatus: boolean;

    constructor(
        dId: number,
        dFirstName: string,
        dLastName: string,
        dMail: string,
        dMobile: string,
        dImage: string,
        dGender: string,
        dAddress: string,
        eId: number,
        dCreatedAt: string,
        dStatus: boolean
    ) {
        this.dId = dId
        this.dFirstName = dFirstName
        this.dLastName = dLastName
        this.dMail = dMail
        this.dMobile = dMobile
        this.dImage = dImage
        this.dGender = dGender
        this.dAddress = dAddress
        this.eId = eId
        this.dCreatedAt = dCreatedAt
        this.dStatus = dStatus
    }
}

