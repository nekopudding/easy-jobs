export enum EXPERIENCE_REQUIRED {
  all,under_3_years_experience, more_than_3_years_experience, no_experience, no_degree
}
export enum EMPLOYMENT_TYPE {
  ALL='ALL',
  FULLTIME='FULLTIME', 
  CONTRACTOR='CONTRACTOR', 
  PARTTIME='PARTTIME', 
  INTERN='INTERN'
}
export enum DATE_POSTED {
  all, today, three_days='3days', week='week',month='month'
}

export type DropdownItem = {
  label: string;
  value: string | EMPLOYMENT_TYPE | EXPERIENCE_REQUIRED | DATE_POSTED;
}