import { CommonServices } from './../../services/common-services';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-order-page',
  imports: [],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss'
})
export class OrderPage {

  commonServices = inject(CommonServices);




}
