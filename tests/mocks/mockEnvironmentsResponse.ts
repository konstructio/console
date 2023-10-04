import { EnvironmentResponse } from '../../types/provision';

export const mockEnvironmentsResponse: EnvironmentResponse[] = [
  {
    _id: 'one',
    name: 'development',
    color: 'sky-blue',
    description: 'Dedicated development environment to develop, play around and iterate.',
    creation_timestamp: '1696281521463',
  },
  {
    _id: 'two',
    name: 'staging',
    color: 'yellow',
    description: 'For testing and validating code before release.',
    creation_timestamp: '1696281569574',
  },
  {
    _id: 'three',
    name: 'production',
    color: 'green',
    description: 'Customer facing environment.',
    creation_timestamp: '1696281593200',
  },
];
