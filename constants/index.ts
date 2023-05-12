export const AWS_REGIONS = [
  { label: 'US East (Ohio) (us-east-2)', value: 'us-east-2' },
  { label: 'US East (N. Virginia) (us-east-1)', value: 'us-east-1' },
  { label: 'US West (N. California) (us-west-1)', value: 'us-west-1' },
  { label: 'US West (Oregon) (us-west-2)', value: 'us-west-2' },
];

export const CIVO_REGIONS = [
  { label: 'New York', value: 'nyc1' },
  { label: 'Phoenix', value: 'phx1' },
  { label: 'France', value: 'fra1' },
  { label: 'London', value: 'lon1' },
];

export const DOCS_LINK = 'https://docs.kubefirst.io';

export const ANALYTICS_ID = '0gAYkX5RV3vt7s4pqCOOsDb6WHPLT30M';

export const EMAIL_REGEX = /.+@.+\..+/;

export const DOMAIN_REGEX = new RegExp(/[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}/);

export const KUBEFIRST_REPOSITORIES = ['gitops', 'metaphor'];
export const KUBEFIRST_TEAMS = ['admins', 'developers'];
