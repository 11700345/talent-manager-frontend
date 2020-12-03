export class Employee {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    organisation: string;
    birthDate: string;
    gender: string;
    phoneNumber: string;
    profilePicture: any;

    constructor(firstName: string, lastName: string, email: string,
                organisation: string, birthDate: string, gender: string,
                phoneNumber: string, profilePicture: string, uuid?: string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.organisation = organisation;
            this.birthDate = birthDate;
            this.gender = gender;
            this.phoneNumber = phoneNumber;
            this.profilePicture = profilePicture;
            this.uuid = uuid;
        }
}
