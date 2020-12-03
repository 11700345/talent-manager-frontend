import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Certificate } from 'src/app/models/certificate.model';
import { validateDateRange } from 'src/app/validators/date.validator';
import { validateUrl } from 'src/app/validators/url.validator';
import { STORAGECONFIG } from '../../../../config/storage.config';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['../../../../shared/shared-form-styles.scss', './certificate.component.scss']
})
export class CertificateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  certificates: Certificate[];

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
      description: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      urlPersonalCertificate: new FormControl(null, [validateUrl])
    }, validateDateRange);

    this.certificates = [];
    this.checkLocalStorage();

    // TODO: API call to GET all certificates

  }

  submitCertificate(form: FormGroup): void {
    const certificate: Certificate = form.value as Certificate;
    certificate.dateAchieved = form.value.startDate;
    certificate.dateExpiration = form.value.endDate;

    this.certificates.push(certificate);
  }

  deleteCertificate(index: number): void {
    if (confirm('Bent u zeker dat u dit certificaat wilt verwijderen?')) {
      this.certificates.splice(index, 1);
    }
  }
  submit(): void {
    console.log(JSON.stringify(this.certificates));
  }

  saveToLocalStorage(): void {
    localStorage.setItem(STORAGECONFIG.wizard.certificates, JSON.stringify(this.certificates));
  }

  checkLocalStorage(): void {
    const storageCertificates: any = JSON.parse(localStorage.getItem(STORAGECONFIG.wizard.certificates));
    if (storageCertificates != null) {
      for (const element of storageCertificates) {
        this.certificates.push(element as Certificate);
      }
    }
  }
}
