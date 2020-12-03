import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Language } from 'src/app/models/language.model';
import { STORAGECONFIG } from '../../../../config/storage.config';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['../../../../shared/shared-form-styles.scss', './language.component.scss']
})
export class LanguageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  languages: Language[];
  languageSkills: string[];

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
      name: new FormControl(null, [Validators.required]),
      speakingProficiency: new FormControl('Basis', [Validators.required]),
      writingProficiency: new FormControl('Basis', [Validators.required])
    });

    this.languages = [];
    this.languageSkills = ['Moedertaal', 'Vlot', 'Gemiddeld', 'Basis'];
    this.checkLocalStorage();

    // TODO: API call to GET all languages
  }

  submitLanguage(form: FormGroup): void {
    this.languages.push(form.value as Language);
    console.log(form.value as Language);
  }

  deleteLanguage(index: number): void {
    if (confirm('Bent u zeker dat u deze taal wilt verwijderen?')) {
      this.languages.splice(index, 1);
    }
  }

  submit(): void {
    console.log(JSON.stringify(this.languages));
  }

  saveToLocalStorage(): void {
    localStorage.setItem(STORAGECONFIG.wizard.languages, JSON.stringify(this.languages));
  }

  checkLocalStorage(): void {
    const storageLanguages: any = JSON.parse(localStorage.getItem(STORAGECONFIG.wizard.languages));
    if (storageLanguages != null) {
      for (const element of storageLanguages) {
        this.languages.push(element as Language);
      }
    }
  }
}
