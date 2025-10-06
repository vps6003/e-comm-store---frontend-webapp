import { CommonVariablesService } from './../../services/common-variables-service';
import { CommonServices } from './../../services/common-services';
import { CategoryService } from './../../services/category';
import { Component, inject } from '@angular/core';
import { Category } from '../../types/category';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { img } from '../../../images/images';
import { AuthServices } from '../../services/authorization/auth-services';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconTooltipDirective } from "../../core/directives/mat-tooltip-directive";
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [RouterModule,
    FormsModule,
    MatIcon,
    MatIconTooltipDirective,
    RouterLink,
    MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

    constructor(private categoryService: CategoryService,
      private authServices : AuthServices,
      private commonServices : CommonServices,
      public commonVariablesService :CommonVariablesService
    ) { }

  // headerLogo: String = img.mainLogo;
  images = img;
  router = inject(Router);
  allCategories: Category[] = [];
  userName :any;
  isAdmin :boolean =false;

  ngOnInit() {
    this.commonServices.getAllCategoriesForCustomer();
    this.allCategories = this.commonVariablesService.allCategories;
    this.userName = this.authServices.userName;
    this.isAdmin = this.authServices.isAdminCheck;
    this.commonVariablesService.searchTerm = "";
  }

  onSearch = (e:any) => {
    this.commonVariablesService.searchTerm = e;
    this.router.navigate(['/products'], { queryParams: { searchTerm: e } });
  }

  onCategorySearch = (e:any) => {
   this.commonVariablesService.searchTerm = "";
    this.router.navigate(['/products'], { queryParams: { categoryId: e } });
 }



logout(){
  this.commonServices.logout();
}

}
