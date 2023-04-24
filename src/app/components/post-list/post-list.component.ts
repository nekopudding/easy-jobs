import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobSearchService } from 'src/app/services/job-search.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  postList: any[] = [];
  postListSubscription: Subscription;

  constructor(private jobSearchService: JobSearchService) {
    this.postListSubscription = this.jobSearchService.onJobListChange().subscribe((data) => {
      this.postList = data
    });
  }

  ngOnInit() {}
}
