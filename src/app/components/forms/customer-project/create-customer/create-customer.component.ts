import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  form: FormGroup;
  customer: Customer;

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      industry: [null, Validators.required],
      descriptionNl: [null, Validators.required],
      descriptionEng: [null, Validators.required]
    });
  }

  submit(form: FormGroup): void {
    this.customer = form.value as Customer;
    console.log(JSON.stringify(this.customer));
    // API CALL TO POST FORM DATA
    this.router.navigateByUrl('customers');
  }

}
