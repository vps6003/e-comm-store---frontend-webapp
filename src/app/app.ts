import { CommonModule, Location } from '@angular/common';
import { Component, inject, NgModule, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { Footer } from './component/footer/footer';
import { Header } from './component/header/header';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonServices } from './services/common-services';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from './core/directives/mat-tooltip.module';
import { LoaderComponent } from './component/loader-component/loader-component';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { LoaderService } from './services/animation-services/loader-spinner/loader-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatButtonModule,
    Footer,
    Header,
    RouterModule,
    CarouselModule,
    MatTooltipModule,
    TooltipModule,
    LoaderComponent,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private loaderService = inject(LoaderService);
  private location = inject(Location);
  private router = inject(Router);

  protected readonly title = signal('webapp');
  private commonServices = inject(CommonServices);

  onLoad = false;

  showBackButton = true;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects;

        // Hide on home/dashboard routes
        this.showBackButton = !(
          currentRoute === '/home' ||
          currentRoute === '/register' ||
          currentRoute === ''
        );
      });
  }

  ngOnInit() {
    this.onLoad = false;
    if (!this.onLoad) this.commonServices.verifyToken();
    if (this.commonServices.loggedInValue) {
      // this.commonServices.verifyToken(this.onLoad);
      this.commonServices.init(this.onLoad);
      this.onLoad = true;
    }
    setTimeout(() => {
      // Set to false to hide loader after a delay
      this.loaderService.hide();
    }, 5000);
  }

  goBack() {
    this.location.back();
  }
}
