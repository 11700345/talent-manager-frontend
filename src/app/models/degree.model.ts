export class Degree {
    uuid: string;
    institute: string;
    name: string;
    specialisation: string;
    startDate: string;
    endDate: string;

    constructor(institute: string, name: string, specialisation: string, startDate: string, endDate: string, uuid?: string) {
        this.uuid = uuid;
        this.institute = institute;
        this.name = name;
        this.specialisation = specialisation;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
