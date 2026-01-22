import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MatBadge } from '@angular/material/badge';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matBadge]',
  standalone: true,
  hostDirectives: [MatBadge], // Automatically include MatBadge behavior
})
export class MatBadgeDirective implements OnChanges {
  private matBadge = inject(MatBadge);
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input('matBadge') badgeContent: string | number | null = null;
  @Input() badgeColor: 'primary' | 'accent' | 'warn' | undefined = 'accent';
  @Input() badgeHidden = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.matBadge.color = this.badgeColor;
    this.matBadge.hidden = this.badgeHidden;
    this.matBadge.content = this.badgeContent;
  }
}
