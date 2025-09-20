import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MatButtonModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
