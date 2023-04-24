import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { JobSearchService } from 'src/app/services/job-search.service';

import { EMPLOYMENT_TYPE, EXPERIENCE_REQUIRED, DATE_POSTED, DropdownItem } from '../../SearchFilters';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  query: string = '';
  employmentType: EMPLOYMENT_TYPE = EMPLOYMENT_TYPE.ALL;
  experienceRequired: EXPERIENCE_REQUIRED = EXPERIENCE_REQUIRED.all;
  datePosted: DATE_POSTED = DATE_POSTED.all;
  faSearch = faSearch;

  employmentTypeOptions: DropdownItem[] = [
    {value: EMPLOYMENT_TYPE.ALL,label: 'Employment Type'}, 
    {value: EMPLOYMENT_TYPE.FULLTIME,label: 'Full Time'}, 
    {value: EMPLOYMENT_TYPE.PARTTIME,label: 'Part Time'}, 
    {value: EMPLOYMENT_TYPE.CONTRACTOR, label: 'Contractor'}, 
    {value: EMPLOYMENT_TYPE.INTERN,label: 'Internship'}
  ]

  experienceRequiredOptions: DropdownItem[] = [
    {value: EXPERIENCE_REQUIRED.all, label: 'Experience Required'},
    {value: EXPERIENCE_REQUIRED.under_3_years_experience, label: '<3 years'},
    {value: EXPERIENCE_REQUIRED.more_than_3_years_experience, label: '>3 years'},
    {value: EXPERIENCE_REQUIRED.no_experience, label: 'No experience'},
    {value: EXPERIENCE_REQUIRED.no_degree, label: 'No degree'}
  ]
  datePostedOptions: DropdownItem[] = [
    {value: DATE_POSTED.all, label: 'Date Posted'},
    {value: DATE_POSTED.today, label: 'Today'},
    {value: DATE_POSTED.three_days, label: 'Last 3 days'},
    {value: DATE_POSTED.week, label: 'Last week'},
    {value: DATE_POSTED.month, label: 'Last month'}
  ]

  constructor(private jobSearchService: JobSearchService) { }

  searchJobs() {
    this.jobSearchService.searchJobs();
  }
}
