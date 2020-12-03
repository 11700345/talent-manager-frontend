import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const uuid: string = this.route.snapshot.params.uuid;
    // API call to get customer using uuid in route
    // Hardcoded for testing purposes
    this.customer = new Customer('Name', 'Industry',
    'Description NL', 'Description Eng', uuid);
  }

}
