import { CommonServices } from './../../services/common-services';
import { Component, inject, OnInit } from '@angular/core';
import { CommonVariablesService } from './../../services/common-variables-service';
import { CustomerServices } from '../../services/customer/customer-services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OrderSuccessPage } from '../CustomerComponent/order-success-page/order-success-page';
import { ToasterMessageService } from '../../services/toaster-message-service';

@Component({
  selector: 'app-checkout-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    OrderSuccessPage,
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
})
export class CheckoutPage implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  toaster = inject(ToasterMessageService);
  customerServices = inject(CustomerServices);
  commonServices = inject(CommonServices);
  commonVariablesService = inject(CommonVariablesService);

  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  loading = false;

  async ngOnInit() {
    this.checkoutForm = this.fb.group({
      name: [this.commonVariablesService.userData?.name || '', Validators.required],
      email: [
        this.commonVariablesService.userData?.email || '',
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{1,10}$/),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      address: ['', Validators.required],
      paymentMethod: ['cod', Validators.required],
    });

    await this.loadCart();
  }

  async loadCart() {
    this.loading = true;
    try {
      const user = localStorage.getItem('user');
      this.commonVariablesService.userData = JSON.parse(user || '{}');
      const userId = this.commonVariablesService.userData?._id;
      const cart: any = await this.customerServices.getUserCart(userId).toPromise();
      this.commonVariablesService.cartData = cart;
      this.cartItems = cart?.productQuantity || [];
      if (this.cartItems.length < 1) {
        this.router.navigateByUrl('/home');
        this.toaster.show('Please Add Items into Cart before Checkout!', 'warning', 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  // Update quantity directly in checkout
  async updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }
    const addObj = {
      userId: this.commonVariablesService.userData?._id,
      productId,
      quantity,
    };
    await this.customerServices.addToCart(addObj).toPromise();
    await this.loadCart();
  }

  // Remove item from cart
  async removeItem(productId: string) {
    const userId = this.commonVariablesService.userData?._id;
    await this.customerServices.removeFromCart({ userId, productId }).toPromise();
    await this.loadCart();
  }

  // Calculated totals
  get originalTotal(): number {
    return this.cartItems.reduce(
      (sum, item: any) => sum + (item.productId.price || 0) * item.quantity,
      0,
    );
  }

  get totalDiscountAmount(): number {
    return this.cartItems.reduce((sum, item: any) => {
      const price = item.productId.price || 0;
      const discount = item.productId.discount || 0;
      return sum + ((price * discount) / 100) * item.quantity;
    }, 0);
  }

  get totalAmount(): number {
    return this.originalTotal - this.totalDiscountAmount;
  }

  placeOrder() {
    if (this.checkoutForm.invalid || this.cartItems.length === 0) return;
    let itemsId: any = [];
    for (let i = 0; i < this.cartItems.length; i++) {
      // console.log(this.cartItems[i].productId);
      if (this.cartItems[i].quantity > 0) {
        itemsId.push({
          productId: this.cartItems[i].productId._id,
          quantity: this.cartItems[i].quantity,
        });
      }
    }

    // MongoDb Order schema
    //  {
    //     date: Date,
    //     userId : {type: Schema.Types.ObjectId , ref :'users'},
    //     item: [{ productId : {type: Schema.Types.ObjectId, ref: "products" }, quantity : Number}],
    //     amount: Number,
    //     email : String,
    //     name: String,
    //     paymentMethod : String,
    //     phoneNumber :String,
    //     address:String,
    //     discount: Number,
    //     finalAmount: Number,
    //     status: Number,
    //   },

    const orderData = {
      userId: this.commonVariablesService.userData?._id,
      item: itemsId,
      status: 0,
      date: new Date(),
      finalAmount: this.totalAmount,
      ...this.checkoutForm.value,
    };

    this.commonServices.newOrder(orderData);
  }

  allowOnlyDigits(event: KeyboardEvent) {
    const input = event.key;
    // Allow only digits
    if (!/[0-9]/.test(input)) {
      event.preventDefault();
    }
  }
}
