import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { validateDateRange } from 'src/app/validators/date.validator';
import { STORAGECONFIG } from '../../../../config/storage.config';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['../../../../shared/shared-form-styles.scss', './course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {

  form: FormGroup;
  courses: Course[];

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDestroy: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnDestroy(): void {
    this.onDestroy.emit(true);
    this.submit();
    this.saveToLocalStorage();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      organizer: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      includedInCv: new FormControl(false, [])
    }, validateDateRange);

    this.courses = [];
    this.checkLocalStorage();

    // TODO: API call to GET all courses
  }

  submitCourse(form: FormGroup): void {
    this.courses.push(form.value as Course);
  }

  deleteCourse(index: number): void {
    if (confirm('Bent u zeker dat u deze course wilt verwijderen?')) {
      this.courses.splice(index, 1);
    }
  }
  submit(): void {
    console.log(JSON.stringify(this.courses));
  }

  saveToLocalStorage(): void {
    localStorage.setItem(STORAGECONFIG.wizard.courses, JSON.stringify(this.courses));
  }

  checkLocalStorage(): void {
    const storageCourses: any = JSON.parse(localStorage.getItem(STORAGECONFIG.wizard.courses));
    if (storageCourses != null) {
      for (const element of storageCourses) {
        this.courses.push(element as Course);
      }
    }
  }
}
