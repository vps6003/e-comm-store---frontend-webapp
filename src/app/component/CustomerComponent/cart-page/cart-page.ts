import { PostMigrationAction } from './../../../../../node_modules/@angular/cdk/schematics/update-tool/migration.d';
import { CommonVariablesService } from './../../../services/common-variables-service';
import { CommonServices } from './../../../services/common-services';
import { Component, inject } from '@angular/core';
import { Product } from '../../../types/product';
import { CustomerServices } from '../../../services/customer/customer-services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {
  commonServices = inject(CommonServices);
  customerServices = inject(CustomerServices);
  commonVariablesService = inject(CommonVariablesService);
  router = inject(Router);

  cartItems: { productId: Product; quantity: number }[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 0;
  paginatedItems: { productId: any; quantity: number }[] = [];
  loading = false;

  async ngOnInit() {
    await this.loadCart();
  }

  async loadCart() {
    this.loading = true;
    try {
      const userId = this.commonVariablesService.userData._id;
      const cart: any = await this.customerServices.getUserCart(userId).toPromise();
      this.cartItems = cart?.productQuantity || [];
      this.totalPages = Math.ceil(this.cartItems.length / this.itemsPerPage);
      this.updatePaginatedItems();
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  updatePaginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedItems = this.cartItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  async removeItem(productId: string) {
    const userId = this.commonVariablesService.userData._id;
    await this.customerServices.removeFromCart({ userId, productId }).toPromise();
    await this.loadCart();
  }

  async updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    const addObj = {
      userId: this.commonVariablesService.userData._id,
      productId,
      quantity
    };
    await this.customerServices.addToCart(addObj).toPromise();
    await this.loadCart();
  }

  // Pagination array for @for loop
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Original total (before discount)
  get originalTotal(): number {
    return this.cartItems.reduce((sum, item:any) => {
      return sum + (item.productId.price || 0) * item.quantity;
    }, 0);
  }

  // Total discount amount in ₹
  get totalDiscountAmount(): number {
    return this.cartItems.reduce((sum, item:any) => {
      const price = item.productId.price || 0;
      const discount = item.productId.discount || 0;
      return sum + (price * discount/100) * item.quantity;
    }, 0);
  }

  // Total discount percentage (weighted)
  get totalDiscount(): number {
    if (this.originalTotal === 0) return 0;
    return (this.totalDiscountAmount / this.originalTotal * 100);
  }

  // Final amount after discount
  get totalAmount(): number {
    return this.originalTotal - this.totalDiscountAmount;
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) return;
    this.router.navigateByUrl('/checkout');
  }

 async clearCart(){
    const result = await this.commonServices.clearCart();
    this.loadCart();
  }
}
