export class NoticeBoardModel {
    nId: number;
    nTitle: string;
    nDescription: string;
    nStartDate: Date;
    nEndDate: Date;
    eId: number;
    nCreatedAt: string;
    nStatus: boolean;
    constructor(
        nId: number,
        nTitle: string,
        nDescription: string,
        nStartDate: Date,
        nEndDate: Date,
        eId: number,
        nCreatedAt: string,
        nStatus: boolean,
    ) {
        this.nId = nId
        this.nTitle = nTitle
        this.nDescription = nDescription
        this.nStartDate = nStartDate
        this.nEndDate = nEndDate
        this.eId = eId
        this.nCreatedAt = nCreatedAt
        this.nStatus = nStatus
    }

}