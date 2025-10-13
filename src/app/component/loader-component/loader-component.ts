import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common'
import { LoaderService } from '../../services/animation-services/loader-spinner/loader-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader-component',
  imports: [AsyncPipe],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.scss'
})
export class LoaderComponent {
  isLoading : Observable<boolean>;

  constructor(private loaderService : LoaderService){
    this.isLoading = this.loaderService.loading$;
  }

}
