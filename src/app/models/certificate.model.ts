export class Certificate {
    uuid: string;
    institute: string;
    name: string;
    description: string;
    dateAchieved: string;
    dateExpiration: string;
    urlPersonalCertificate: string;

    constructor(institute: string, name: string, description: string, dateAchieved: string,
                dateExpiration: string, urlPersonalCertificate: string, uuid?: string) {
        this.uuid = uuid;
        this.institute = institute;
        this.name = name;
        this.description = description;
        this.dateAchieved = dateAchieved;
        this.dateExpiration = dateExpiration;
        this.urlPersonalCertificate = urlPersonalCertificate;
    }
}
