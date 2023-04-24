import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  selectedPost: Number = 0;
  private selectedSubject = new Subject<any>();

  constructor() { }

  selectPost(index: Number) {
    this.selectedPost = index;
    this.selectedSubject.next(this.selectedPost);
  }

  onSelectPost(): Observable<any> {
    return this.selectedSubject.asObservable();
  }
}
