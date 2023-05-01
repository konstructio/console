import { useRouter } from 'next/router';
import { FunctionComponent, useEffect } from 'react';

const DashboardPage: FunctionComponent = () => {
  const { replace } = useRouter();

  useEffect(() => {
    // redirect fallback to services
    replace('/services');
  });

  return null;
};

export default DashboardPage;