import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';

import ServiceComponent from '../../components/service';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { checkSiteReadiness } from '../../redux/thunks/readiness.thunk';

export interface ServiceProps {
  description?: string;
  domainName: string;
  children?: React.ReactNode;
  image: string;
  name: string;
  links?: Array<string>;
  onClickLink: (link: string, name: string) => void;
}

const isGitLink = (url: string) => url.includes('github') || url.includes('gitlab');

const Service: FunctionComponent<ServiceProps> = ({ links: serviceLinks, ...props }) => {
  const [firstLoad, setFirstLoad] = useState(false);

  const [links, setLinks] = useState<{ [url: string]: boolean } | undefined>(
    serviceLinks?.reduce((previous, current) => {
      return { ...previous, [current]: isGitLink(current) };
    }, {}),
  );

  const dispatch = useAppDispatch();
  const availableSites = useAppSelector(({ readiness }) => readiness.availableSites);

  const isSiteAvailable = useCallback(
    (url: string) => {
      return availableSites.includes(url) || isGitLink(url);
    },
    [availableSites],
  );

  const checkSiteAvailability = useCallback(
    (url: string) => {
      const isAvailable = isSiteAvailable(url);

      if (!isAvailable) {
        return dispatch(checkSiteReadiness({ url }));
      }
    },
    [dispatch, isSiteAvailable],
  );

  useEffect(() => {
    if (availableSites.length) {
      setLinks(
        links &&
          Object.keys(links).reduce(
            (previous, current) => ({ ...previous, [current]: isSiteAvailable(current) }),
            {},
          ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableSites]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        links &&
        Object.keys(links).map((url) => {
          const isAvailable = links[url];
          !isAvailable && checkSiteAvailability(url);
        }),
      20000,
    );
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
      links &&
        Object.keys(links).map(async (url) => {
          await checkSiteAvailability(url);
        });
    }
  }, [checkSiteAvailability, dispatch, firstLoad, links]);

  return <ServiceComponent {...props} links={links} />;
};

export default Service;
