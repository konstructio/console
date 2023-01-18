import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('./terminalLogs'), {
  ssr: false,
});

const Terminal = () => <DynamicComponentWithNoSSR />;

export default Terminal;
