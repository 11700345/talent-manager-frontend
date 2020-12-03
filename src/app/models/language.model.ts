export class Language {
    uuid: string;
    name: string;
    speakingProficiency: string;
    writingProficiency: string;

    constructor(name: string, speakingProf: string, writingProf: string, uuid?: string) {
        this.uuid = uuid;
        this.name = name;
        this.speakingProficiency = speakingProf;
        this.writingProficiency = writingProf;
    }
}
