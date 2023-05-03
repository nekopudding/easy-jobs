import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

import { response } from '../mock-posts';
import { apiKey } from './secrets';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  jobs: any[] = []
  jobsSubject = new BehaviorSubject<any>(this.jobs);
  apiUrl: string = 'https://jsearch.p.rapidapi.com/search'
  headers: HttpHeaders = new HttpHeaders({
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    'x-rapidapi-key': apiKey
  })
  
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  searchJobs(
    query: string,
    page:Number=1,
    employment_type: string, //FULLTIME,CONTRACTOR,PARTTIME,INTERN
    date_posted: string, //all (default),today,3days,week,month
    experience_required:string, //under_3_years_experience, more_than_3_years_experience, no_experience, no_degree
  ) {
    if (query.trim() === '') {
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
    this.http.get(this.apiUrl,options).subscribe((res:any) => {
      this.jobs = this.mapResponse(res);
      this.jobsSubject.next(this.jobs);
    });
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
