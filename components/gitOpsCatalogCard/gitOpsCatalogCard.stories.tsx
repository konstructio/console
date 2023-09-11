import { Meta, StoryObj } from '@storybook/react';

import { AppCategory, GitOpsCatalogApp } from '../../types/gitOpsCatalog';

import GitOpsCatalogCard from '.';

const meta: Meta<typeof GitOpsCatalogCard> = {
  component: GitOpsCatalogCard,
};

export default meta;

const mockApp: GitOpsCatalogApp = {
  name: 'datadog-agent',
  display_name: 'datadog-agent',
  image_url: 'https://imgix.datadoghq.com/img/dd_logo_n_70x75.png',
  description:
    "Datadog's SaaS-based infrastructure monitoring provides metrics, visualizations, and alerting to ensure your engineering teams can maintain and optimize your cloud or hybrid environments.",
  categories: [AppCategory.OBSERVABIILITY],
  category: AppCategory.OBSERVABIILITY,
};

export const Default: StoryObj<typeof GitOpsCatalogCard> = {
  args: mockApp,
};
