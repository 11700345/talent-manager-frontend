import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SoftSkill } from 'src/app/models/soft-skill.model';
import { STORAGECONFIG } from '../../../../config/storage.config';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['../../../../shared/shared-form-styles.scss', './soft-skills.component.scss']
})
export class SoftSkillsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  softSkills: SoftSkill[];

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDestroy: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnDestroy(): void {
    if (this.softSkills.length >= 2) {
      this.onDestroy.emit(true);
      this.submit();
    } else {
      this.onDestroy.emit(false);
    }

    this.saveToLocalStorage();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl(null, [Validators.required])
    });

    this.softSkills = [];
    this.checkLocalStorage();

    // TODO: API call to GET all soft skills
  }

  submitSoftSkill(form: FormGroup): void {
    if (this.softSkills.length < 6) {
      this.softSkills.push(form.value as SoftSkill);
    } else {
      alert('U mag maar maximum 6 soft skills toevoegen.');
    }
  }

  deleteSoftSkill(index: number): void {
    if (this.softSkills.length > 2) {
      if (confirm('Bent u zeker dat u deze soft skill wil verwijderen?')) {
        this.softSkills.splice(index, 1);
      }
    } else {
      alert('U moet minimum over 2 soft skills beschikken.');
    }

  }

  submit(): void {
    console.log(JSON.stringify(this.softSkills));
  }

  saveToLocalStorage(): void {
    localStorage.setItem(STORAGECONFIG.wizard.softSkills, JSON.stringify(this.softSkills));
  }

  checkLocalStorage(): void {
    const storageSoftskills: any = JSON.parse(localStorage.getItem(STORAGECONFIG.wizard.softSkills));
    if (storageSoftskills != null) {
      for (const element of storageSoftskills) {
        this.softSkills.push(element as SoftSkill);
      }
    }
  }
}
