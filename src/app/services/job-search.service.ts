import { Injectable } from '@angular/core';
import { EMPLOYMENT_TYPE } from '../SearchFilters';
import { Observable, of } from 'rxjs';
import { response } from '../mock-posts';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  constructor() { }

  searchJobs(
    page:Number=1,
    query='Python developer in Texas, USA',
    employment_type=EMPLOYMENT_TYPE.INTERN
  ): Observable<any[]> {
    const list = response.data.map(post => {
      const {employer_name,employer_logo,employer_website,
        job_id,job_title,job_apply_link,job_description,job_posted_at_datetime_utc,
        job_city,job_state,job_country,job_offer_expiration_datetime_utc,
        job_highlights,job_employment_type,job_min_salary,job_max_salary,
        job_salary_currency,job_salary_period,job_required_experience
      } = post;
      
      return {
        employer_name,employer_logo,employer_website,
        job_id,job_title,job_apply_link,job_description,job_posted_at_datetime_utc,
        job_city,job_state,job_country,job_offer_expiration_datetime_utc,
        job_highlights,job_employment_type,job_min_salary,job_max_salary,
        job_salary_currency,job_salary_period,job_required_experience: job_required_experience.required_experience_in_months
      }
    })
    
    return of(list)
  }
}
