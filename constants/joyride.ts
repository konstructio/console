import { Step } from 'react-joyride';

export const JOYRIDE_STEPS: Step[] = [
  {
    target: '.management-cluster',
    title: '1/3',
    content:
      'This represents the management cluster that was created on completion of the kubefirst wizard.',
    disableBeacon: true,
    placement: 'right',
    styles: {
      spotlight: {
        paddingLeft: '70px',
        transform: 'translateX(-70px)',
      },
    },
  },
  {
    target: '.workload-cluster-2',
    title: '2/3',
    content:
      'To get you started, we’ve created three virtual workload clusters each with a default environment. These clusters run inside your management cluster.',
    disableBeacon: true,
    placement: 'left',
    floaterProps: {
      styles: {
        floater: {
          translate: '-60px',
        },
      },
    },
    styles: {
      spotlight: {
        paddingLeft: '60px',
        paddingTop: '510px',
        transform: 'translate(-65px,-255px)',
      },
    },
    hideBackButton: true,
  },
  {
    target: '.workload-cluster-2',
    title: '3/3',
    content:
      'You can add or remove environments, or delete the cluster itself by simply clicking on the cluster to open the cluster details panel.',
    disableBeacon: true,
    placement: 'left',
    floaterProps: {
      styles: {
        floater: {
          translate: '-60px',
        },
      },
    },
    styles: {
      spotlight: {
        paddingLeft: '60px',
        transform: 'translateX(-60px)',
      },
    },
    hideBackButton: true,
  },
];
