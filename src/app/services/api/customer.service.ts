import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Customer } from '../../models';

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}${APICONFIG.routes.customers}`;

@Injectable()
export class CustomerService implements ApiService {

    constructor(private http: HttpClient) {}

    getSingle(uuid: string): Observable<any> {
        return this.http.get(`${APIURL}/${uuid}`).pipe(
            map(this.parseCustomerData),
            map((customers: Customer[]) => {
                return customers[0];
            }));
    }

    getAll(): Observable<any[]> {
        return this.http.get(APIURL).pipe(
            map(this.parseCustomerData),
            map((customers: Customer[]) => {
                return customers;
            }));
    }

    add(customer: Customer): Observable<any> {
        return this.http.post(APIURL, customer);
    }

    update(uuid: string, data: any): Observable<any> {
        return this.http.put(`${APIURL}/${uuid}`, data);
    }

    delete(uuid: string): Observable<any> {
        return this.http.delete(`${APIURL}/${uuid}`);
    }

    parseCustomerData(rawCustomers: any[]): Customer[] {
        return Object.keys(rawCustomers).map(key => {
            const customer = rawCustomers[key];
            return new Customer(
                customer.name,
                customer.industry,
                customer.descriptionNl,
                customer.descriptionEng,
                customer.uuid
            );
        });
    }
}
