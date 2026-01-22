import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterMessageService } from '../../../services/toaster-message-service';

@Component({
  selector: 'app-order-success-page',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './order-success-page.html',
  styleUrls: ['./order-success-page.scss'],
})
export class OrderSuccessPage implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private toaster = inject(ToasterMessageService);

  // @Input() orderId: string | null = null;
  // @Input() customerName: string | null = null;
  // @Input() totalAmount: number | null = null;
  // @Input() itemsCount: number | null = null;
  // @Input() estimatedDelivery: string | null = null;
  @Input() orderData: any | null = null;

  private confettiElements: HTMLElement[] = [];
  private onViewChildFlag = false;

  ngOnit() {
    this.onViewChildFlag = true;
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.launchConfetti();
    }
  }

  ngOnDestroy(): void {
    this.cleanupConfetti();
  }

  trackOrder(): void {
    const orderId = this.orderData?._id?.trim();

    if (orderId) {
      this.router.navigate(['/orderDetails'], {
        queryParams: { orderId: orderId },
        state: { from: 'order-summary' },
      });
    } else {
      this.toaster.show('Order ID not found, redirecting to orders list.', 'warning', 5000);
      this.router.navigate(['/orders']);
    }
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  private launchConfetti(): void {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement('div');
      const size = Math.random() * 0.4 + 0.2;
      confetti.classList.add('confetti');
      confetti.style.cssText = `
        position: absolute;
        width: ${size}rem;
        height: ${size * 3}rem;
        background-color: ${this.randomColor()};
        left: ${Math.random() * 100}%;
        top: -${Math.random() * 10}%;
        opacity: ${Math.random()};
        transform: rotate(${Math.random() * 360}deg);
        animation: fall ${3 + Math.random() * 3}s linear infinite;
        border-radius: 0.2rem;
        pointer-events: none;
      `;
      container.appendChild(confetti);
      this.confettiElements.push(confetti);
    }

    // inject animation if not already present
    if (!document.getElementById('confetti-style')) {
      const style = document.createElement('style');
      style.id = 'confetti-style';
      style.innerHTML = `
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  private cleanupConfetti(): void {
    this.confettiElements.forEach((el) => el.remove());
    this.confettiElements = [];
  }

  private randomColor(): string {
    const colors = ['#06b6d4', '#3b82f6', '#facc15', '#22c55e', '#f472b6', '#f97316'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
