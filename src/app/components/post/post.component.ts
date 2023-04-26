import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { JobSearchService } from 'src/app/services/job-search.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  postList: any[] = [];
  postListSubscription: Subscription;
  selected: number = 0;
  selectedSubscription: Subscription;

  constructor(private jobSearchService: JobSearchService, private uiService: UiService) {
    this.postListSubscription = this.jobSearchService.onJobListChange().subscribe((data) => {
      this.postList = data
    });

    this.selectedSubscription = this.uiService.onSelectPost().subscribe((data) => {
      this.selected = <number>data;
    });
  }
  ngOnInit() {}

  getJobDescriptionArray(): string[] {
    let description:string = this.postList[this.selected].job_description;
    //double new line characters
    let descriptionArr:string[] = description.split('\n');
    return descriptionArr
  }
}
