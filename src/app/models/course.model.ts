export class Course {
    uuid: string;
    title: string;
    organizer: string;
    startDate: string;
    endDate: string;
    includedInCV: boolean;

    constructor(title: string, organizer: string, startDate: string, endDate: string, includedInCv: boolean, uuid?: string) {
        this.title = title;
        this.organizer = organizer;
        this.startDate = startDate;
        this.endDate = endDate;
        this.includedInCV = includedInCv;
        this.uuid = uuid;
    }
}
