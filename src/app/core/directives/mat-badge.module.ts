import { MatBadgeDirective } from './mat-badge';
import { MatBadgeModule } from '@angular/material/badge';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [MatBadgeModule,MatBadgeDirective ],
  exports: [MatBadgeModule, MatBadgeDirective],
})
export class BadgeModule {}
