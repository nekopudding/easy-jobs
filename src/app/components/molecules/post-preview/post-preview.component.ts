import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent {
  @Input() post: any;
  @Input() index: Number = -1;
  @Output() onSelect: EventEmitter<Number> = new EventEmitter<any>();
  job_title: string = '';
  job_employer_name: string = '';
  job_location: string = '';
  job_offer_expiration_datetime_utc: string = '';
  job_posted_at_datetime_utc: string = '';
  employer_logo: string = '';
  faClock = faClock;


  selected: boolean = false;
  selectedSubscription: Subscription
  constructor(private uiService: UiService) {
    this.selectedSubscription = this.uiService.onSelectPost().subscribe((index: Number) => {
      this.selected = index === this.index;
    });
  }

  ngOnInit() {
    this.selected = this.index === 0;
    this.job_title = this.post.job_title.length > 30 ? this.post.job_title.slice(0, 30) + '...' : this.post.job_title
    this.job_employer_name = this.post.job_employer_name
    this.job_location = this.post.job_location
    this.job_offer_expiration_datetime_utc = this.post.job_offer_expiration_datetime_utc
    this.job_posted_at_datetime_utc = this.post.job_posted_at_datetime_utc
    this.employer_logo = this.post.employer_logo
  }

  onClick() {
    this.uiService.selectPost(this.index);
  }
}
