export class SoftSkill {
    uuid: string;
    employeeId: string;
    title: string;
    description: string;

    constructor(title: string, description: string, employeeId?: string, uuid?: string) {
        this.uuid = uuid;
        this.employeeId = employeeId;
        this.title = title;
        this.description = description;
    }
}
