import { CommonVariablesService } from './../../../services/common-variables-service';
import { CommonServices } from './../../../services/common-services';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details-page',
  imports: [CommonModule],
  templateUrl: './order-details-page.html',
  styleUrl: './order-details-page.scss',
})
export class OrderDetailsPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);


  public commonServices = inject(CommonServices);
  public commonVariablesService = inject(CommonVariablesService);

  ngOnInit(): void {
    // console.log(this.route.queryParams)
    this.route.queryParams.subscribe((params) => {
      const orderId = params['orderId'];
      // console.log('Order ID from query:', orderId);
      this.commonServices.getOrderDetails(orderId);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commonVariablesService.orderDetails = null;
  }

  orderDetails = {
    orderId: 'ORD123456789',
    orderDate: new Date(),
    status: 'Shipped',
    customerName: 'Vaibhav Saraf',
    address: '123 MG Road, Pune, Maharashtra, India',
    phone: '+91 9876543210',
    items: [
      {
        name: 'Wireless Headphones',
        image: 'https://via.placeholder.com/80',
        quantity: 1,
        price: 2999,
      },
      {
        name: 'Bluetooth Speaker',
        image: 'https://via.placeholder.com/80',
        quantity: 2,
        price: 1499,
      },
    ],
    subtotal: 5997,
    shipping: 99,
    total: 6096,
  };
}
