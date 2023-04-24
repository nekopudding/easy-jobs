import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  selectedPost: Number = 0;
  private selectedSubject = new BehaviorSubject<any>(0);

  constructor() { }

  selectPost(index: Number) {
    this.selectedPost = index;
    this.selectedSubject.next(this.selectedPost);
  }

  onSelectPost(): Observable<any> {
    return this.selectedSubject.asObservable();
  }
}
