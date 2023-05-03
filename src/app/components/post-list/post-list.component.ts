import { Component, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { JobSearchService } from 'src/app/services/job-search.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  postList: any[] = [];
  postListSubscription: Subscription;
  hostRef: ElementRef;
  isRefreshing: boolean = false;
  isRefreshingSubscription: Subscription;

  constructor(private jobSearchService: JobSearchService, private elRef:ElementRef, private uiService: UiService) {
    this.hostRef = this.elRef;
    this.postListSubscription = this.jobSearchService.onJobListChange().subscribe((data) => {
      this.postList = data
    });
    this.isRefreshingSubscription = this.uiService.onRefresh().subscribe((isRefreshing: boolean) => this.isRefreshing = isRefreshing);
  }

  ngOnInit() {}

  @HostListener('wheel', ['$event']) // for scroll events of the current element
  onScroll(event: any) {
    if (event.deltaY > 0 && this.hostRef.nativeElement.scrollTop >= this.hostRef.nativeElement.scrollHeight - this.hostRef.nativeElement.offsetHeight - 1) {
      this.jobSearchService.loadMoreJobs();
    }
  }
}
