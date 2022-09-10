import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Admin } from '../../models/admin'
import { AdminService } from '../../services/admin.service';
import { PageEvent, MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  totalElements: number = 0;
  admins: Admin[]=[];
  loading: boolean;
  name: any;
  checkSearch = false;
  searchAdmins: Admin[] = [];
  searchText;
  sizeSearch: number = 0;
  nameAdmin;
  orderHeader: String ='';
  isDescOrder: boolean = true;

  constructor(private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.checkSearch){
      this.getAdmins({page: 0,size: 5})
    }
  }

  sort(headerName:String){
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  private getAdmins(request){
    this.loading = true;
    this.adminService.pageAdmin(request).subscribe(data => {
      console.log(data);
      this.admins = data['content'];
      this.totalElements = data['totalElements'];
      this.loading = false;
    },
      error=>{
        this.loading = false;
      }
    );
  }

  nextPage(event: PageEvent){
    console.log('event -->', event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getAdmins(request);
    // this.getSearchByName(request, this.nameAdmin);
  }

  deleteAdmin(id: number){
    if(confirm("Bạn chắc chắn muốn xóa không?")){
      this.adminService.deleteAdmin(id)
        .subscribe(response => {
          this.admins = this.admins.filter(admin => admin.id != id);
          this.ngOnInit();
      })
    }
  }

  //search
  // private getSearchByName(request, nameAdmin){
  //   this.loading = true;
  //   this.nameAdmin = nameAdmin;
  //   console.log('name == ', this.nameAdmin);
  //   if(this.nameAdmin == ''){
  //     return;
  //   }
  //   this.adminService.searchByName(request, this.nameAdmin).subscribe(data =>{
  //     console.log('data => ', data);
  //     this.searchAdmins = data['content'];
  //     console.log('data[content] => ',data['content']);
  //     this.totalElements = data['totalElements'];
  //     this.sizeSearch = this.totalElements;
  //     console.log('data[totalElements] => ',data['totalElements']);
  //     this.loading = false;
  //   },error =>{
  //     this.loading = false;
  //   });
  // }

  // private onSearch(){
  //   this.checkSearch = true;
  //   console.log('name == ', this.nameAdmin);
  //   if(this.nameAdmin == ""){
  //     this.checkSearch = true;
  //     return;
  //   }
  //     this.getSearchByName({page: 0, size: this.sizeSearch}, this.nameAdmin);
  // }

  detailsAdmin(id: number){
    this.router.navigate(['admin/admin-form', id]);
  }
}
