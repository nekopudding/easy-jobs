import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

import { jobs } from '../mock-jobs';
import { apiKey } from './secrets';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  jobs: any[] = [];
  jobsSubject = new BehaviorSubject<any>(this.jobs);
  apiUrl: string = 'https://jsearch.p.rapidapi.com/search'
  headers: HttpHeaders = new HttpHeaders({
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    'x-rapidapi-key': apiKey
  })
  isRefreshing: boolean = false;
  isRefreshingSubscription: Subscription;
  currRequest: any = {
    query: '',
    page: 1,
    employment_type: '',
    date_posted: '',
    experience_required: ''
  }
  
  constructor(private http: HttpClient, private uiService: UiService) {
    this.isRefreshingSubscription = this.uiService.onRefresh().subscribe((isRefreshing: boolean) => this.isRefreshing = isRefreshing);
  }

  ngOnInit() {}

  searchJobs(
    query: string,
    employment_type: string, //FULLTIME,CONTRACTOR,PARTTIME,INTERN
    date_posted: string, //all (default),today,3days,week,month
    experience_required:string, //under_3_years_experience, more_than_3_years_experience, no_experience, no_degree
  ) {
    this.getJobs(query,1,employment_type,date_posted,experience_required);
  }

  loadMoreJobs() {
    const {query,page,employment_type,date_posted,experience_required} = this.currRequest;
    this.getJobs(query,page+1,employment_type,date_posted,experience_required)
  }

  getJobs(
    query: string,
    page: number,
    employment_type: string, //FULLTIME,CONTRACTOR,PARTTIME,INTERN
    date_posted: string, //all (default),today,3days,week,month
    experience_required:string, //under_3_years_experience, more_than_3_years_experience, no_experience, no_degree
  ) {
    if (query.trim() === '' || this.isRefreshing) {
      return;
    }
    if (this.jobs.length % 10 !== 0 && page > 1) { //no more jobs to load
      return;
    }

    let params:any = { query: query.trim(), page }
    if (employment_type !== '') params.employment_type = employment_type
    if (date_posted !== '') params.date_posted = date_posted
    if (experience_required !== '') params.experience_required = experience_required

    const options = {
      headers: this.headers,
      params
    }
    try {
      this.uiService.toggleRefresh(true);
      this.http.get(this.apiUrl,options).subscribe((res:any) => {
        if (page === 1) {
          this.jobs = this.mapResponse(res);
        } else {
          this.jobs = [...this.jobs,...this.mapResponse(res)];
        }

        this.jobsSubject.next(this.jobs);
        if(page === 1) {
          this.currRequest = {query,page: 1,employment_type,date_posted,experience_required};
        } else {
          this.currRequest.page = page;
        }
        this.uiService.toggleRefresh(false);
      });
    } catch(err) {
      console.error(err);
      this.uiService.toggleRefresh(false);
    }
  }


  onJobListChange(): Observable<any[]> {
    return this.jobsSubject.asObservable();
  }

  mapResponse(res: any) {
    return res.data.map((post:any) => {
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
  }
}
