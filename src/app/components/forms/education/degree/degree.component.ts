import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Degree } from 'src/app/models/degree.model';
import { validateDateRange } from 'src/app/validators/date.validator';
import { STORAGECONFIG } from '../../../../config/storage.config';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['../../../../shared/shared-form-styles.scss', './degree.component.scss']
})
export class DegreeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  degrees: Degree[];
  
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
      institute: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      specialisation: new FormControl(null, []),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required])
    }, validateDateRange);

    this.degrees = [];
    this.checkLocalStorage();

    // TODO: API call to GET degrees
  }

  submitDegree(form: FormGroup): void {
    this.degrees.push(form.value as Degree);
  }

  deleteDegree(index: number): void {
    if (confirm('Bent u zeker dat u deze opleiding wilt verwijderen?')) {
      this.degrees.splice(index, 1);
    }
  }

  submit(): void {
    console.log(JSON.stringify(this.degrees));
  }

  saveToLocalStorage(): void {
    localStorage.setItem(STORAGECONFIG.wizard.degrees, JSON.stringify(this.degrees));
  }

  checkLocalStorage(): void {
    const storageDegrees: any = JSON.parse(localStorage.getItem(STORAGECONFIG.wizard.degrees));
    if (storageDegrees != null) {
      for (const element of storageDegrees) {
        this.degrees.push(element as Degree);
      }
    }
  }
}
