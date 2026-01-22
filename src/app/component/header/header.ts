import { CommonVariablesService } from './../../services/common-variables-service';
import { CommonServices } from './../../services/common-services';
import { CategoryService } from './../../services/category';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../types/category';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { img } from '../../../images/images';
import { AuthServices } from '../../services/authorization/auth-services';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'] // corrected from styleUrl
})
export class Header implements OnInit {
  private categoryService = inject(CategoryService);
  private authServices = inject(AuthServices);
  private commonServices = inject(CommonServices);
  commonVariablesService = inject(CommonVariablesService);


  images = img;
  router = inject(Router);
  allCategories: Category[] = [];
  userName: any;
  isAdmin = false;
  onLoad  = true;

  // MOBILE MENU STATE
  mobileMenuOpen = false;

  ngOnInit() {
    this.onLoad = false;
    this.userName = this.authServices.userName;
    this.isAdmin = this.authServices.isAdminCheck;
    this.allCategories = this.commonVariablesService.allCategories;
    this.commonVariablesService.searchTerm = "";
    // this.commonServices.loginSubscribe();
    this.commonVariablesService.loggedIn$.subscribe((loggedIn) => {
      if (!loggedIn) {
        this.userName = null;
        this.isAdmin = false;
      } else {
        this.userName = this.authServices.userName;
        this.isAdmin = this.authServices.isAdminCheck;
        this.commonServices.getAllCategoriesForCustomer(this.onLoad);
        this.commonServices.getProfileDetails();
        // this.commonServices.verifyToken(this.onLoad);
        this.onLoad = true;
      }
  });
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
