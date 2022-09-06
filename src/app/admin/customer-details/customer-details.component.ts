import { Customer } from './../../models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private customerService: CustomerService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      let id: number = params['id'];
      if(id){
        this.customerService.getCustomer(id)
            .subscribe(response => this.customer = response);
      }
    })
  }

  goToCustomerList(){
    this.router.navigate(['admin/customer']);
  }

}
