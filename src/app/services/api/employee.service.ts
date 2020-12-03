import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs' ;

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}${APICONFIG.routes.employees}`;

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) {}

    update(employee: any): Observable<any> {
        return this.http.put(APIURL, employee);
    }
}
