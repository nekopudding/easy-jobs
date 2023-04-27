import { Injectable } from '@angular/core';
import { EMPLOYMENT_TYPE } from '../SearchFilters';
import { Observable, BehaviorSubject } from 'rxjs';
import { response } from '../mock-posts';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  jobs: any[] = response.data.map(post => {
    const {employer_name,employer_logo,employer_website,
      job_id,job_title,job_apply_link,job_description,job_posted_at_datetime_utc,
      job_city,job_state,job_country,job_offer_expiration_datetime_utc,
      job_highlights,job_employment_type,job_min_salary,job_max_salary,
      job_salary_currency,job_salary_period,job_required_experience
    } = post;

    return {
      employer_name,employer_logo,employer_website,
      job_id,job_title,job_apply_link,job_description,
      job_highlights,job_min_salary,job_max_salary,
      job_salary_currency,job_salary_period,
      job_required_experience: job_required_experience.required_experience_in_months,
      job_location: job_city ? `${job_city}, ${job_state}, ${job_country}` : '',
      job_offer_expiration_datetime_utc: job_offer_expiration_datetime_utc,
      job_posted_at_datetime_utc: job_posted_at_datetime_utc,
      job_employment_type: job_employment_type.toLowerCase(),
    }
  });

  private jobsSubject = new BehaviorSubject<any>(this.jobs);
  
  constructor() {}

  ngOnInit() {}

  searchJobs(
    query='Python developer in Texas, USA',
    page:Number=1,
    employment_type=EMPLOYMENT_TYPE.INTERN
  ) {
    //api call and update jobs
    this.jobsSubject.next(this.jobs);
  }

  onJobListChange(): Observable<any[]> {
    return this.jobsSubject.asObservable();
  }
}
