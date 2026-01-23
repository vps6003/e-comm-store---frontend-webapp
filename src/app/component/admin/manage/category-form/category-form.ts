import { ToasterMessageService } from './../../../../services/toaster-message-service';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from './../../../../services/category';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  imports: [
    MatInput,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit {
  name!: string;
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToasterMessageService);
  isEdit = false;
  id!: string;
  categoryService = new CategoryService();
  idParams!: any;

  ngOnInit() {
    this.isEdit = false;
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((result: any) => {
        this.idParams = result;
      });
    }
  }

  update(id: string, name: string) {
    this.idParams.name = name;
    this.categoryService.updateCategoryById(id, this.idParams).subscribe((result: any) => {
      this.idParams = result.result;
    });
  }

  add() {
    this.categoryService.addCategory(this.name).subscribe((result: any) => {
      this.toaster.show('Category added : ' + result.name, 'success');
      this.router.navigateByUrl('/admin/categories');
    });
  }
}
