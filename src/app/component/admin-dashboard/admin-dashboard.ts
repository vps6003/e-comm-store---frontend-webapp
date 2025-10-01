import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatButtonModule,
    RouterModule

  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  router = inject(Router);

}
