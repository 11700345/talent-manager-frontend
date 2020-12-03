import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs' ;
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Course } from '../../models';

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}/${APICONFIG.routes.courses}`;

@Injectable()
export class CourseService implements ApiService {

    constructor(private http: HttpClient) {}

    /**
     * Get single course
     * @param uuid uuid of course
     */
    getSingle(uuid: string): Observable<any> {
        return this.http.get(`${APIURL}/${uuid}`).pipe(
            map(this.parseCourseData),
            map((courses: Course[]) => {
                return courses[0];
            }));
    }

    /**
     * Get all courses
     */
    getAll(): Observable<any[]> {
        return this.http.get(APIURL).pipe(
            map(this.parseCourseData),
            map((courses: Course[]) => {
                return courses;
            }));
    }

    /**
     * Add new course
     */
    add(course: Course): Observable<any> {
        return this.http.post(APIURL, course);
    }

    /**
     * Update existing course with new values
     * @param uuid uuid of course
     * @param data data of updated course
     */
    update(uuid: string, data: any): Observable<any> {
        return this.http.patch(`${APIURL}/${uuid}`, data);
    }

    /**
     * Delete existing course
     * @param uuid uuid of course
     */
    delete(uuid: string): Observable<any> {
        return this.http.delete(`${APIURL}/${uuid}`);
    }

    parseCourseData(rawCourses: any[]): Course[] {
        return Object.keys(rawCourses).map(key => {
            const course = rawCourses[key];
            return new Course(
                course.name,
                course.email,
                course.phone,
                course.isFavorite,
                course.avatar,
                course.uuid
            );
        });
    }
}
