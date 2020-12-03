import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../../services/api';

@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.component.scss']
})
export class CustomerOverviewComponent implements OnInit {
  customers: Customer[];
  filteredCustomers: Customer[];
  searchString: string;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    // API CALL TO GET ALL CUSTOMERS
    this.customers = [new Customer('Bewire', 'IT Consultancy', 'Dutch description', 'English description', '12345'),
    new Customer('Emenka', '.NET Consultancy', 'Dutch description', 'English description', '54321')];
    this.filteredCustomers = this.customers;
  }

  onCustomerClick(uuid: string): void {
    this.router.navigate(['/customer', uuid]);
  }

  onClick(): void {
    this.router.navigateByUrl('createcustomer');
  }

  onChange(): void {
    if (this.searchString != null && this.searchString !== '') {
      console.log(this.searchString);
      this.filteredCustomers = this.customers.filter(c => c.name.toLowerCase().includes(this.searchString));
    } else {
      this.filteredCustomers = this.customers;
    }
  }

}
