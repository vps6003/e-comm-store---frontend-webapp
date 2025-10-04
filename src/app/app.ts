
import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { Footer } from './component/footer/footer';
import { Header } from './component/header/header';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonServices } from './services/common-services';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from './core/directives/mat-tooltip.module';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatButtonModule,
    Footer,
    Header,
    RouterModule,
    CarouselModule,
    MatTooltipModule,
    TooltipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('webapp');
  private commonServices = inject(CommonServices)

  ngOnInit() {
    this.commonServices.verifyToken();
    this.commonServices.init();
  }

}
