export class Customer {
    uuid: string;
    name: string;
    industry: string;
    descriptionNl: string;
    descriptionEng: string;

    constructor(name: string, industry: string, descriptionNl: string, descriptionEng: string, uuid?: string) {
        this.name = name;
        this.industry = industry;
        this.descriptionNl = descriptionNl;
        this.descriptionEng = descriptionEng;
        this.uuid = uuid;
    }
}
