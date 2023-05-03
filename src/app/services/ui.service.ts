import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  selectedPost: Number = 0;
  private selectedSubject = new BehaviorSubject<any>(0);
  isRefreshing: Boolean = false;
  private isRefreshingSubject = new BehaviorSubject<any>(false);

  constructor() { }

  selectPost(index: Number) {
    this.selectedPost = index;
    this.selectedSubject.next(this.selectedPost);
  }

  onSelectPost(): Observable<any> {
    return this.selectedSubject.asObservable();
  }

  toggleRefresh(isRefreshing: Boolean) {
    this.isRefreshing = isRefreshing;
    console.log(isRefreshing)
    this.isRefreshingSubject.next(this.isRefreshing);
  }

  onRefresh(): Observable<any> {
    return this.isRefreshingSubject.asObservable();
  }
}
