import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Language } from '../../models';

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}/${APICONFIG.routes.languages}`;

@Injectable()
export class LanguageService implements ApiService {

    constructor(private http: HttpClient) {}

    getSingle(uuid: string): Observable<any> {
        return this.http.get(`${APIURL}/${uuid}`).pipe(
            map(this.parseLanguageData),
            map((languages: Language[]) => {
                return languages[0];
            }));
    }

    getAll(): Observable<any[]> {
        return this.http.get(APIURL).pipe(
            map(this.parseLanguageData),
            map((languages: Language[]) => {
                return languages;
            }));
    }

    add(language: Language): Observable<any> {
        return this.http.post(APIURL, language);
    }

    update(uuid: string, data: any): Observable<any> {
        return this.http.patch(`${APIURL}/${uuid}`, data);
    }

    delete(uuid: string): Observable<any> {
        return this.http.delete(`${APIURL}/${uuid}`);
    }

    parseLanguageData(rawLanguages: any[]): Language[] {
        return Object.keys(rawLanguages).map(key => {
            const language = rawLanguages[key];
            return new Language(
                language.name,
                language.speakingProficiency,
                language.writingProficiency,
                language.uuid
            );
        });
    }
}
