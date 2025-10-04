import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-inline-toast',
  standalone: true,          // <-- standalone
  imports: [CommonModule],   // <-- import CommonModule
  template: `
    <div
      class="px-4 py-2 rounded shadow-lg text-white mb-2 transition-opacity duration-500 flex items-center justify-between min-w-[250px]"
      [ngClass]="{
        'bg-green-500': type === 'success',
        'bg-red-500': type === 'error',
        'bg-blue-500': type === 'info',
        'bg-yellow-500 text-black': type === 'warning'
      }"
      [style.opacity]="visible ? 1 : 0"
    >
      <span>{{ message }}</span>
      <button (click)="hide()" class="ml-2 font-bold">✕</button>
    </div>
  `
})
export class InlineToastComponent {
  @Input() message = '';
  @Input() type: ToastType = 'info';
  visible = true;

  hide() {
    this.visible = false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToasterMessageService {
    private overlays: OverlayRef[] = [];

  constructor(private overlay: Overlay) {}

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().top('1rem').right('1rem'),
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    const toastPortal = new ComponentPortal(InlineToastComponent);
    const toastRef = overlayRef.attach(toastPortal);
    toastRef.instance.message = message;
    toastRef.instance.type = type;

    this.overlays.push(overlayRef);

    // Auto dismiss
    setTimeout(() => {
      toastRef.instance.hide();
      setTimeout(() => overlayRef.dispose(), 500); // wait for fade-out
      this.overlays = this.overlays.filter(o => o !== overlayRef);
    }, duration);
  }

}
