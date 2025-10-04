import { Directive, Input, HostListener } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[tooltip]',
  standalone: true,
  providers: [MatTooltip],
})
export class MatIconTooltipDirective {
  @Input('tooltip') message: string = '';
  @Input() tooltipPosition: 'above' | 'below' | 'left' | 'right' = 'below';
  @Input() showDelay = 500;
  @Input() hideDelay = 200;

  constructor(private tooltip: MatTooltip) {
    this.tooltip.position = this.tooltipPosition;
    this.tooltip.showDelay = this.showDelay;
    this.tooltip.hideDelay = this.hideDelay;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.tooltip.message = this.message;
    this.tooltip.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.tooltip.hide();
  }
}
