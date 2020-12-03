import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Certificate } from '../../models';

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}${APICONFIG.routes.certificates}`;

@Injectable()
export class CertificateService implements ApiService {

    constructor(private http: HttpClient) {}

    /**
     * Get single certificate
     * @param uuid uuid of certificate
     */
    getSingle(uuid: string): Observable<any> {
        return this.http.get(`${APIURL}/${uuid}`).pipe(
            map(this.parseCertificateData),
            map((certificates: Certificate[]) => {
                return certificates[0];
            }));
    }

    /**
     * Get all certificates
     */
    getAll(): Observable<any[]> {
        return this.http.get(APIURL).pipe(
            map(this.parseCertificateData),
            map((certificates: Certificate[]) => {
                return certificates;
            }));
    }

    /**
     * Add new certificate
     */
    add(certificate: Certificate): Observable<any> {
        return this.http.post(APIURL, certificate);
    }

    /**
     * Update existing certificate with new values
     * @param uuid uuid of certificate
     * @param data data of updated certificate
     */
    update(uuid: string, data: any): Observable<any> {
        return this.http.patch(`${APIURL}/${uuid}`, data);
    }

    /**
     * Delete existing certificate
     * @param uuid uuid of certificate
     */
    delete(uuid: string): Observable<any> {
        return this.http.delete(`${APIURL}/${uuid}`);
    }

    parseCertificateData(rawCertificates: any[]): Certificate[] {
        return Object.keys(rawCertificates).map(key => {
            const certificate = rawCertificates[key];
            return new Certificate(
                certificate.institute,
                certificate.name,
                certificate.description,
                certificate.dateAchieved,
                certificate.dateExpiration,
                certificate.urlPersonalCertificate,
                certificate.uuid
            );
        });
    }
}
