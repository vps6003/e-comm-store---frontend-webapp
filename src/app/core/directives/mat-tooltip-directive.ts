import { Directive, Input, HostListener, inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tooltip]',
  standalone: true,
  providers: [MatTooltip],
})
export class MatIconTooltipDirective {
  private tooltip = inject(MatTooltip);

  @Input('tooltip') message = '';
  @Input() tooltipPosition: 'above' | 'below' | 'left' | 'right' = 'below';
  @Input() showDelay = 500;
  @Input() hideDelay = 200;

  constructor() {
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
