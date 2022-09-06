import { ActivatedRoute, Router } from '@angular/router';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category = new Category();
  constructor(private categoryService: CategoryService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToCategoryList(){
    this.router.navigate(['admin/category-list']);
  }
  saveCategory(){
    this.categoryService.createCategory(this.category)
    .subscribe(Response=> {
      this.goToCategoryList();
    }, 
    error => console.log(error));
  }

}
