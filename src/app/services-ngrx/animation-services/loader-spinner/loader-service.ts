import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading = new BehaviorSubject<boolean>(false);
  loading$ : Observable<boolean> = this.loading.asObservable();

  show = ():void =>{
    this.loading.next(true);
  }

  hide = ():void =>{
    this.loading.next(false);
  }

}
