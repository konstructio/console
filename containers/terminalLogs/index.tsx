import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('./component.js').then((param) => param.default),
  {
    ssr: false,
  },
);

const Terminal = () => <DynamicComponentWithNoSSR />;

export default Terminal;
