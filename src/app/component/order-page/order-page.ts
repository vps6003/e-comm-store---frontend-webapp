import { CommonVariablesService } from './../../services/common-variables-service';
import { Router } from '@angular/router';
import { CommonServices } from './../../services/common-services';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-page',
  imports: [CommonModule],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss'
})
export class OrderPage implements OnInit {
  private router = inject(Router);


  commonServices = inject(CommonServices);
  commonVariablesService = inject(CommonVariablesService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.commonServices.getAllOrdersOfUSer();
    // console.log(this.commonVariablesService.ordersData);
  }

//   {
//     "_id": "68e10b1098abf319e9f723b1",
//     "date": "2025-10-04T11:54:56.599Z",
//     "userId": "68d2774106d665f3bd076040",
//     "item": [
//         {
//             "productId": "68be6d142ae795d839388797",
//             "quantity": 1,
//             "_id": "68e10b1098abf319e9f723b2"
//         }
//     ],
//     "finalAmount": 500,
//     "status": 0,
//     "createdAt": "2025-10-04T11:54:56.794Z",
//     "updatedAt": "2025-10-04T11:54:56.794Z",
//     "__v": 0
// }

  orders = [
    {
      orderId: 'ORD001',
      orderDate: new Date('2025-09-29'),
      status: 'Delivered',
      items: [
        { name: 'Smart Watch', image: 'https://via.placeholder.com/80', quantity: 1, price: 1999 },
        { name: 'Phone Case', image: 'https://via.placeholder.com/80', quantity: 2, price: 499 }
      ],
      total: 2997
    },
    {
      orderId: 'ORD002',
      orderDate: new Date('2025-10-03'),
      status: 'Shipped',
      items: [
        { name: 'Bluetooth Earbuds', image: 'https://via.placeholder.com/80', quantity: 1, price: 2499 }
      ],
      total: 2499
    },
    {
      orderId: 'ORD003',
      orderDate: new Date('2025-10-04'),
      status: 'Pending',
      items: [
        { name: 'Gaming Mouse', image: 'https://via.placeholder.com/80', quantity: 1, price: 1499 }
      ],
      total: 1499
    }
  ];

  viewOrderDetails(orderId: string) {
    this.router.navigate(['/orderDetails'], { queryParams: { orderId :orderId } });
  }




}
