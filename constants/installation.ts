import { AuthKeys, InstallationInfo, InstallationType } from '../types/redux';

import { DOCS_LINK } from '@/constants';

export enum MarketplaceFormStep {
  AUTHENTICATION = 0,
  SETUP = 1,
  PROVISIONING = 2,
  READY = 3,
}

export enum K3DFormStep {
  SETUP = 1,
  PROVISIONING = 2,
  READY = 3,
}

export enum FormStep {
  AUTHENTICATION = 1,
  SETUP = 2,
  PROVISIONING = 3,
  READY = 4,
}

export const INFO_INSTALLATION_TYPES: Record<InstallationType, Record<number, InstallationInfo>> = {
  [InstallationType.AKAMAI]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Akamai Prerequisites',
      description: [
        '<a href="https://login.linode.com/login" target="_blank">Create an Akamai account</a> in which you are an account owner.',
        'Establish a publicly routable DNS. <a href="https://www.linode.com/docs/products/networking/dns-manager/guides/create-domain/" target="_blank">Learn more</a>',
      ],
    },
  },
  [InstallationType.AZURE]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Azure Prerequisites',
      description: [
        'Create an <a href="https://portal.azure.com/#create/Microsoft.AzureSupport/createRequest/form/basic?WT.mc_id=Portal-Microsoft_Azure_Support" target="_blank">Azure account</a> in which you are an account owner.',
        'Have a <a href="https://docs.microsoft.com/en-us/azure/dns/dns-overview" target="_blank">publicly routable DNS zone</a> available.',
        'Have a <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app" target="_blank">Microsoft Entra app</a> and <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal" target="_blank">service principal</a> with Owner permissions on your subscription.',
      ],
    },
  },
  [InstallationType.LOCAL]: {
    [K3DFormStep.SETUP]: {
      title: 'Tip',
      description: `Once you’re ready to start your Cloud version you can delete your local cluster by running:`,
      code: 'kubefirst k3d destroy',
      ctaDescription: 'Learn more',
      ctaLink: '',
    },
  },
  [InstallationType.AWS]: {
    [FormStep.AUTHENTICATION]: {
      title: 'AWS Prerequisites',
      description: [
        'Create an AWS account with billing enabled.',
        'Establish a public hosted zone with dns routing established (<a href="https://docs.aws.amazon.com/route53/" target="_blank">docs</a>).',
        `Connect with AdministratorAccess IAM credentials to your AWS account (<a href="${DOCS_LINK}/aws/quick-start/install/cli#aws-prerequisites" target="_blank">docs</a>).`,
      ],
      ctaDescription: 'Learn more',
      ctaLink: 'https://docs.aws.amazon.com',
    },
  },
  [InstallationType.CIVO]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Civo Prerequisites',
      description: [
        '<a href="https://dashboard.civo.com/signup" target="_blank">Create a Civo account</a> in which you are an account owner.',
        'Establish a publicly routable DNS. <a href="https://www.civo.com/learn/configure-dns#adding-a-domain-name" target="_blank">Learn more</a>',
      ],
    },
  },
  [InstallationType.DIGITAL_OCEAN]: {
    [FormStep.AUTHENTICATION]: {
      title: 'DigitalOcean Prerequisites',
      description: [
        'Create a <a href="https://cloud.digitalocean.com/registrations/new" target="_blank">DigitalOcean account</a>.',
        'Add your <a href="https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/" target="_blank">domain name</a>.',
        'Create a personal <a href="https://docs.digitalocean.com/reference/api/create-personal-access-token" target="_blank">access token</a>.',
        'Generate Spaces <a href="https://docs.digitalocean.com/products/spaces/how-to/manage-access/#access-keys" target="_blank">access key</a>.',
      ],
    },
  },

  [InstallationType.VULTR]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Vultr Prerequisites',
      description: [
        'Create a <a href="https://www.vultr.com/register/" target="_blank">Vultr account</a>.',
        'Add your <a href="https://my.vultr.com/dns/" target="_blank">domain name</a>.',
        'Get your personal <a href="https://my.vultr.com/settings/#settingsapi" target="_blank">access token</a>.',
      ],
    },
  },
  [InstallationType.GOOGLE]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Google Cloud Provider Prerequisites',
      description: [
        'Create a <a href="https://cloud.google.com/" target="_blank">Google cloud account</a> in which you are the owner.',
        'Have a <a href="https://cloud.google.com/dns/docs/overview" target="_blank">publicly routable DNS</a> available.',
        'Use the <a href="https://cloud.google.com/docs/authentication/application-default-credentials#GAC" target="_blank">GOOGLE_APPLICATION_CREDENTIALS</a> environment variable to provide the location credentials JSON file.',
      ],
    },
  },
};

export const INFO_MARKETPLACE_INSTALLATION_TYPES: Record<
  InstallationType,
  Record<number, InstallationInfo>
> = {
  [InstallationType.AKAMAI]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Akamai Prerequisites',
      description: [
        '<a href="https://login.linode.com/login" target="_blank">Create an Akamai account</a> in which you are an account owner.',
        'Establish a publicly routable DNS. <a href="https://www.linode.com/docs/products/networking/dns-manager/guides/create-domain/" target="_blank">Learn more</a>',
      ],
    },
  },
  [InstallationType.AZURE]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Azure Prerequisites',
      description: [
        'Create an <a href="https://portal.azure.com/#create/Microsoft.AzureSupport/createRequest/form/basic?WT.mc_id=Portal-Microsoft_Azure_Support" target="_blank">Azure account</a> in which you are an account owner.',
      ],
    },
  },
  [InstallationType.LOCAL]: {
    [K3DFormStep.SETUP]: {
      title: 'Tip',
      description: `Once you’re ready to start your Cloud version you can delete your local cluster by running:`,
      code: 'kubefirst k3d destroy',
      ctaDescription: 'Learn more',
      ctaLink: '',
    },
  },
  [InstallationType.AWS]: {
    [FormStep.AUTHENTICATION]: {
      title: 'AWS Prerequisites',
      description: [
        'Create an AWS account with billing enabled.',
        'Establish a public hosted zone with dns routing established (<a href="https://docs.aws.amazon.com/route53/" target="_blank">docs</a>).',
        `Connect with AdministratorAccess IAM credentials to your AWS account (<a href="${DOCS_LINK}/aws/quick-start/install/cli#aws-prerequisites" target="_blank">docs</a>).`,
      ],
      ctaDescription: 'Learn more',
      ctaLink: 'https://docs.aws.amazon.com',
    },
  },
  [InstallationType.CIVO]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Civo Prerequisites',
      description: [
        'Have an object store bucket available',
        'Establish a publicly routable DNS. <a href="https://www.civo.com/learn/configure-dns#adding-a-domain-name" target="_blank">Learn more</a>',
      ],
    },
  },
  [InstallationType.DIGITAL_OCEAN]: {
    [FormStep.AUTHENTICATION]: {
      title: 'DigitalOcean Prerequisites',
      description: [
        'Create a <a href="https://cloud.digitalocean.com/registrations/new" target="_blank">DigitalOcean account</a>.',
        'Add your <a href="https://docs.digitalocean.com/products/networking/dns/how-to/add-domains/" target="_blank">domain name</a>.',
        'Create a personal <a href="https://docs.digitalocean.com/reference/api/create-personal-access-token" target="_blank">access token</a>.',
      ],
    },
  },

  [InstallationType.VULTR]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Vultr Prerequisites',
      description: [
        'Create a <a href="https://www.vultr.com/register/" target="_blank">Vultr account</a>.',
        'Add your <a href="https://my.vultr.com/dns/" target="_blank">domain name</a>.',
        'Get your personal <a href="https://my.vultr.com/settings/#settingsapi" target="_blank">access token</a>.',
      ],
    },
  },
  [InstallationType.GOOGLE]: {
    [FormStep.AUTHENTICATION]: {
      title: 'Google Cloud Provider Prerequisites',
      description: [
        'Create a <a href="https://cloud.google.com/" target="_blank">Google cloud account</a> in which you are the owner.',
        'Have a <a href="https://cloud.google.com/dns/docs/overview" target="_blank">publicly routable DNS</a> available.',
        'Use the <a href="https://cloud.google.com/docs/authentication/application-default-credentials#GAC" target="_blank">GOOGLE_APPLICATION_CREDENTIALS</a> environment variable to provide the location credentials JSON file.',
      ],
    },
  },
};

export const INSTALLATION_TYPE_API_KEYS: Record<InstallationType, AuthKeys | null> = {
  [InstallationType.AKAMAI]: {
    authKey: 'akamai_auth',
    fieldKeys: [
      {
        name: 'token',
        label: 'Akamai API key',
        helperText:
          'Retrieve your key at <a href="https://cloud.linode.com/profile/tokens" target="_blank">https://cloud.linode.com/profile/tokens</a>',
      },
    ],
  },
  [InstallationType.AZURE]: {
    authKey: 'azure_auth',
    fieldKeys: [
      {
        name: 'client_id',
        label: 'Client ID',
        helperText:
          'Retrieve the service principal’s Client ID in the Azure portal under Certificates & secrets.',
        type: 'text',
      },
      {
        name: 'client_secret',
        label: 'Client Secret',
        helperText:
          'Retrieve the service principal’s Client secret in the Azure portal under Certificates & secrets.',
      },
      {
        name: 'tenant_id',
        label: 'Tenant ID',
        helperText:
          'Retrieve the Tenant ID by selecting Microsoft Entra ID from the menu on the Azure portal; Basic information section.',
        type: 'text',
      },
      {
        name: 'subscription_id',
        label: 'Subscription ID',
        helperText:
          'Retrieve the Subscription ID in the Azure portal and selecting Subscriptions under the Azure services heading.',
        type: 'text',
      },
    ],
  },
  [InstallationType.LOCAL]: null,
  [InstallationType.AWS]: {
    authKey: 'aws_auth',
    fieldKeys: [
      {
        name: 'access_key_id',
        label: 'AWS access key id',
        helperText:
          'Create an access key ID by navigating to Users on the AWS console and opening the Security credentials tab.',
      },
      {
        name: 'secret_access_key',
        label: 'AWS Secret access key',
        helperText:
          'Create a secret access key by navigating to Users on the AWS console and opening the Security credentials tab.',
      },
      {
        name: 'session_token',
        label: 'AWS session token',
        helperText: 'Use the AWS CLI tool and the command “aws sts get-session-token”.',
      },
    ],
  },
  [InstallationType.CIVO]: {
    authKey: 'civo_auth',
    fieldKeys: [
      {
        name: 'token',
        label: 'CIVO API key',
        helperText:
          'Retrieve your key at <a href="https://dashboard.civo.com/security" target="_blank">https://dashboard.civo.com/security</a>',
      },
    ],
  },
  [InstallationType.DIGITAL_OCEAN]: {
    authKey: 'do_auth',
    fieldKeys: [
      {
        name: 'token',
        label: 'DigitalOcean authentication token',
        helperText:
          'Create your token by following the instructions at <a href="https://cloud.digitalocean.com/account/api" target="_blank">https://cloud.digitalocean.com/account/api</a>',
      },
      {
        name: 'spaces_key',
        label: 'DigitalOcean spaces key',
        helperText:
          'From the DigitalOcean control panel, click API. Navigate to the Spaces Keys tab, select Generate New Key.',
      },
      {
        name: 'spaces_secret',
        label: 'DigitalOcean spaces secret',
        helperText:
          'Click API on the control panel and retrieve the spaces secret from the Spaces Key tab.',
      },
    ],
  },
  [InstallationType.VULTR]: {
    authKey: 'vultr_auth',
    fieldKeys: [
      {
        name: 'token',
        label: 'Vultr API key',
        helperText:
          'Retrieve your key at <a href="https://my.vultr.com/settings/#settingsapi" target="_blank">https://my.vultr.com/settings/#settingsapi</a>',
      },
    ],
  },
  [InstallationType.GOOGLE]: null,
};

export const DEFAULT_STEPS = [
  'Select platform',
  'Authentication',
  'Cluster details',
  'Provisioning',
  'Ready',
];

export const MARKETPLACE_STEPS = ['Authentication', 'Cluster details', 'Provisioning', 'Ready'];

export const INSTALL_TYPE_STEPS: Record<InstallationType, Array<string>> = {
  [InstallationType.LOCAL]: ['Select platform', 'Cluster details', 'Provisioning', 'Ready'],
  [InstallationType.AKAMAI]: DEFAULT_STEPS,
  [InstallationType.AWS]: DEFAULT_STEPS,
  [InstallationType.CIVO]: DEFAULT_STEPS,
  [InstallationType.DIGITAL_OCEAN]: DEFAULT_STEPS,
  [InstallationType.VULTR]: DEFAULT_STEPS,
  [InstallationType.GOOGLE]: DEFAULT_STEPS,
  [InstallationType.AZURE]: DEFAULT_STEPS,
};

export const LOCAL_INSTALL_TITLES = {
  0: `First, select your preferred Git provider`,
  1: `Let’s configure your local cluster`,
  2: `Grab a cup of tea or coffee while we set up your cluster...`,
  3: 'You’re all set!',
};

export const CLOUD_REGION_LABELS: Record<InstallationType, string | null> = {
  [InstallationType.AKAMAI]: 'Cloud region',
  [InstallationType.AWS]: 'Cloud region',
  [InstallationType.CIVO]: 'Cloud region',
  [InstallationType.DIGITAL_OCEAN]: 'Datacenter region',
  [InstallationType.VULTR]: 'Cloud location',
  [InstallationType.LOCAL]: null,
  [InstallationType.GOOGLE]: 'Cloud region',
  [InstallationType.AZURE]: 'Cloud region',
};

export const CLUSTER_DOMAIN_LABELS: Record<InstallationType, string | null> = {
  [InstallationType.AKAMAI]: 'Cluster domain name',
  [InstallationType.AWS]: 'Hosted zone name',
  [InstallationType.CIVO]: 'Cluster domain name',
  [InstallationType.DIGITAL_OCEAN]: 'Cluster hostname',
  [InstallationType.VULTR]: 'Cluster hostname',
  [InstallationType.LOCAL]: null,
  [InstallationType.GOOGLE]: 'Hosted zone name',
  [InstallationType.AZURE]: 'DNS zone name',
};
