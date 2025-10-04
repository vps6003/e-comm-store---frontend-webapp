import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { MatBadge } from '@angular/material/badge';

@Directive({
  selector: '[matBadge]',
  standalone: true,
  hostDirectives: [MatBadge], // Automatically include MatBadge behavior
})
export class MatBadgeDirective implements OnChanges {
  @Input('matBadge') badgeContent: string | number | null = null;
  @Input() badgeColor: 'primary' | 'accent' | 'warn' | undefined = 'accent';
  @Input() badgeHidden = false;

  constructor(private matBadge: MatBadge, private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.matBadge.color = this.badgeColor;
    this.matBadge.hidden = this.badgeHidden;
    this.matBadge.content = this.badgeContent;
  }
}
