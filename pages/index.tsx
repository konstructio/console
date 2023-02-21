import { useRouter } from 'next/router';
import { FunctionComponent, useEffect } from 'react';

// import Dashboard from '../containers/dashboard';

const DashboardPage: FunctionComponent = () => {
  const { replace } = useRouter();

  useEffect(() => {
    // redirect fallback to services
    replace('/services');
  });

  return null;

  // return <Dashboard />;
};

export default DashboardPage;
