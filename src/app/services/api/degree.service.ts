import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Degree } from '../../models';

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}/${APICONFIG.routes.degrees}`;

@Injectable()
export class DegreeService implements ApiService {

    constructor(private http: HttpClient) {}

    /**
     * Get single degree
     * @param uuid uuid of degree
     */
    getSingle(uuid: string): Observable<any> {
        return this.http.get(`${APIURL}/${uuid}`).pipe(
            map(this.parseDegreeData),
            map((degrees: Degree[]) => {
                return degrees[0];
            }));
    }

    /**
     * Get all degrees
     */
    getAll(): Observable<any[]> {
        return this.http.get(APIURL).pipe(
            map(this.parseDegreeData),
            map((degrees: Degree[]) => {
                return degrees;
            }));
    }

    /**
     * Add new degree
     */
    add(degree: Degree): Observable<any> {
        return this.http.post(APIURL, degree);
    }

    /**
     * Update existing degree with new values
     * @param uuid uuid of degree
     * @param data data of updated degree
     */
    update(uuid: string, data: any): Observable<any> {
        return this.http.patch(`${APIURL}/${uuid}`, data);
    }

    /**
     * Delete existing degree
     * @param uuid uuid of degree
     */
    delete(uuid: string): Observable<any> {
        return this.http.delete(`${APIURL}/${uuid}`);
    }

    parseDegreeData(rawDegrees: any[]): Degree[] {
        return Object.keys(rawDegrees).map(key => {
            const degree = rawDegrees[key];
            return new Degree(
                degree.institute,
                degree.name,
                degree.specialisation,
                degree.startDate,
                degree.endDate,
                degree.uuid
            );
        });
    }
}
