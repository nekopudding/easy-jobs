import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';

import { JobSearchService } from 'src/app/services/job-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  formData: FormGroup = new FormGroup({
    query: new FormControl(''),
    employmentType: new FormControl(''),
    experienceRequired: new FormControl(''),
    datePosted: new FormControl('')
  });

  faSearch = faSearch;
  logo: string = 'EASYJOBS'

  dropdowns= [
    {name: 'employmentType', options: [
      {value: '',label: 'Employment Type'}, 
      {value: 'FULLTIME',label: 'Full Time'}, 
      {value: 'PARTTIME',label: 'Part Time'}, 
      {value: 'CONTRACTOR', label: 'Contractor'}, 
      {value: 'INTERN',label: 'Internship'}
    ]},
    {name: 'experienceRequired', options: [
      {value: '', label: 'Experience Required'},
      {value: 'under_3_years_experience', label: '<3 years'},
      {value: 'more_than_3_years_experience', label: '>3 years'},
      {value: 'no_experience', label: 'No experience'},
      {value: 'no_degree', label: 'No degree'}
    ]},
    {name: 'datePosted', options: [
      {value: '', label: 'Date Posted'},
      {value: 'today', label: 'Today'},
      {value: 'three_days', label: 'Last 3 days'},
      {value: 'week', label: 'Last week'},
      {value: 'month', label: 'Last month'}
    ]}
  ]

  constructor(private jobSearchService: JobSearchService) { }

  searchJobs() {
    const {query,employmentType,experienceRequired,datePosted} = this.formData.value
    this.jobSearchService.searchJobs(query,1,employmentType,experienceRequired,datePosted);
  }

  ngOnInit() {
    this.randomizeLogo();
  }
  randomizeLogo() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    const initLogo = 'EASYJOBS';
    let currIndex = 0;
    const interval = setInterval(() => {
      if (currIndex > initLogo.length) {
        clearInterval(interval);
        return;
      }
      this.logo = initLogo.split('')
        .map((letter,i) => {
          if (i < currIndex) {
            return initLogo[i];
          }
          return alphabet[Math.floor(Math.random() * alphabet.length)]
        })
        .join('');
      currIndex += 1/3;
    }, 30);
  }

}
