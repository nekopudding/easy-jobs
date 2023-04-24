import { Component } from '@angular/core';
import { response } from 'src/app/mock-posts';
import { JobSearchService } from 'src/app/services/job-search.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  postList: any[] = [];

  constructor(private jobSearchService: JobSearchService) {}

  ngOnInit() {
    this.jobSearchService.searchJobs().subscribe((data) => this.postList = data);
  }
}
