
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { Footer } from './component/footer/footer';
import { Header } from './component/header/header';
// import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonServices } from './services/common-services';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatButtonModule,
    Footer,
    Header,
    RouterModule,
    // BrowserModule,
    CarouselModule
    // BrowserAnimationsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('webapp');
  private commonServices = inject(CommonServices)

  ngOnInit() {
    if(!this.commonServices.isLoggedIn){
    this.commonServices.verifyToken();
  }
  }


  //  interV =   setInterval(() => {
  //   this.commonServices.verifyToken();
  // }, 300000);

}
