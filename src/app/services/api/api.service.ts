import { Observable } from 'rxjs';

export interface ApiService {
    getSingle(uuid: string): Observable<any>;
    getAll(): Observable<any[]>;
    add(object: any): Observable<any>;
    update(uuid: string, data: any): Observable<any>;
    delete(uuid: string): Observable<any>;
}
