import { PageEvent } from '@angular/material/paginator';
import { Customer } from './../../models/customer';
import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  totalElements: number = 0;
  customers: Customer[]=[];
  name: any;

  loading: boolean;
  checkSearch = false;
  searchText;
  sizeSearch: number = 0;
  nameCustomer;
  constructor(private customerService: CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.checkSearch){
      this.getCustomers({page: 0, size: 10})
    }
  }

  private getCustomers(request){
    this.loading = true;
    this.customerService.getListCustomer(request).subscribe(data => {
      console.log(data);
      this.customers = data['content'];
      this.totalElements = data['totalElements'];
      this.loading = false;
    }, error =>{
      this.loading = false;
    })
  }

  nextPage(event: PageEvent){
    console.log('event -->', event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getCustomers(request);
  }
  detailsCustomer(id: number){
    this.router.navigate(['customer/details', id]);
  }

}
