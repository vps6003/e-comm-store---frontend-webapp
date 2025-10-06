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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    FormsModule,
    MatIcon,
    MatIconTooltipDirective,
    RouterLink,
    MatBadgeModule,
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'] // corrected from styleUrl
})
export class Header {

  images = img;
  router = inject(Router);
  allCategories: Category[] = [];
  userName: any;
  isAdmin: boolean = false;

  // MOBILE MENU STATE
  mobileMenuOpen: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private authServices: AuthServices,
    private commonServices: CommonServices,
    public commonVariablesService: CommonVariablesService
  ) { }

  ngOnInit() {
    this.commonServices.getAllCategoriesForCustomer();
    this.allCategories = this.commonVariablesService.allCategories;
    this.userName = this.authServices.userName;
    this.isAdmin = this.authServices.isAdminCheck;
    this.commonVariablesService.searchTerm = "";
    this.commonServices.verifyToken();
  }

  // SEARCH FUNCTION
  onSearch = (e: any) => {
    this.commonVariablesService.searchTerm = e;
    this.router.navigate(['/products'], { queryParams: { searchTerm: e } });
  }

  onCategorySearch = (e: any) => {
    this.commonVariablesService.searchTerm = "";
    this.router.navigate(['/products'], { queryParams: { categoryId: e } });
  }

  // LOGOUT
  logout() {
    this.commonServices.logout();
  }

  // TOGGLE MOBILE MENU
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
