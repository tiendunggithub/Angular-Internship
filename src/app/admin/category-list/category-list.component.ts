import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(private CategoryFormComponent: MatDialog, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  private getCategories(){
    this.categoryService.getCategoryList().subscribe(data => {
      this.categories = data;
    });
  }

  openDialog() {
    const dialogRef = this.CategoryFormComponent.open(CategoryFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
