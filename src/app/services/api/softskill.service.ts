import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { SoftSkill } from '../../models';

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}/${APICONFIG.routes.softskills}`;

@Injectable()
export class SoftSkillService implements ApiService {

    constructor(private http: HttpClient) {}

    /**
     * Get single softskill
     * @param uuid uuid of softskill
     */
    getSingle(uuid: string): Observable<any> {
        return this.http.get(`${APIURL}/${uuid}`).pipe(
            map(this.parseSoftSkillData),
            map((softSkills: SoftSkill[]) => {
                return softSkills[0];
            }));
    }

    /**
     * Get all softskills
     */
    getAll(): Observable<any[]> {
        return this.http.get(APIURL).pipe(
            map(this.parseSoftSkillData),
            map((softSkills: SoftSkill[]) => {
                return softSkills;
            }));
    }

    /**
     * Add new softskills
     */
    add(softskills: SoftSkill[]): Observable<any> {
        return this.http.post(APIURL, softskills);
    }

    /**
     * Update existing softskill with new values
     * @param uuid uuid of softskill
     * @param data data of updated softskill
     */
    update(uuid: string, data: any): Observable<any> {
        return this.http.patch(`${APIURL}/${uuid}`, data);
    }

    /**
     * Delete existing softskill
     * @param uuid uuid of softskill
     */
    delete(uuid: string): Observable<any> {
        return this.http.delete(`${APIURL}/${uuid}`);
    }

    parseSoftSkillData(rawSoftSkills: any[]): SoftSkill[] {
        return Object.keys(rawSoftSkills).map(key => {
            const softSkill = rawSoftSkills[key];
            return new SoftSkill(
                softSkill.name,
                softSkill.email,
                softSkill.employeeId,
                softSkill.uuid
            );
        });
    }
}
