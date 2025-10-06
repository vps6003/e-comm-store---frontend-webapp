
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeDirective } from './core/directives/mat-badge';
import { TooltipModule } from './core/directives/mat-tooltip.module';
import { BadgeModule } from './core/directives/mat-badge.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    // other modules
    MatTooltipModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeDirective,
    TooltipModule,
    BadgeModule,
    CommonModule
  ],
})
export class AppModule {}
