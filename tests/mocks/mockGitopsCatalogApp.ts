import { AppCategory, GitOpsCatalogApp } from '../../types/applications';

export const mockGitopsCatalogApp: GitOpsCatalogApp = {
  name: 'kutt',
  display_name: 'Kutt',
  secret_keys: [
    {
      name: 'admin.emails',
      label:
        'Comma seperated list of email addresses that can access admin actions on settings page',
    },
    {
      name: 'config.disallowAnonymousLinks',
      label: 'true or false to Disable anonymous link creation',
    },
    {
      name: 'mail-from',
      label: 'The email address Kutt will send emails from',
    },
    {
      name: 'mail-host',
      label: 'The host of the external SMTP server that Kutt should use to send emails',
    },
    {
      name: 'mail-password',
      label: 'The password to authenticate to the SMTP host when sending emails',
    },
    {
      name: 'mail-port',
      label: 'The port used to connect to the SMTP host',
    },
    {
      name: 'mail-secure',
      label:
        'true or false. If true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false',
    },
    {
      name: 'mail-username',
      label: 'The username to authenticate to the SMTP host when sending emails',
    },
  ],
  image_url: 'https://kutt.it/images/logo.svg',
  description:
    'Kutt is a modern URL shortener with support for custom domains. Shorten URLs, manage your links and view the click rate statistics.',
  category: AppCategory.APPLICATIONS,
};
