export class Project {
    uuid: string;
    name: string;
    contextNl: string;
    contextEng: string;
    startDate: string;
    endDate: string;

    constructor(name: string, contextNl: string, contextEng: string,
                startDate: string, endDate: string, uuid?: string) {
            this.uuid = uuid;
            this.name = name;
            this.contextNl = contextNl;
            this.contextEng = contextEng;
            this.startDate = startDate;
            this.endDate = endDate;
    }
}
