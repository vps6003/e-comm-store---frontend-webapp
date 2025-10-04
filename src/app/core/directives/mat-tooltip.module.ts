import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconTooltipDirective } from './mat-tooltip-directive';


@NgModule({
  declarations: [],
  imports: [MatTooltipModule, MatIconTooltipDirective],
  exports: [MatTooltipModule, MatIconTooltipDirective],
})
export class TooltipModule {}
