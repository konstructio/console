import { isEmpty } from 'lodash';
import { createSelector } from '@reduxjs/toolkit';

import { IConfigState } from '../slices/config.slice';
import { RootState } from '../store';
import { buildCardsContent, CardsContentProps } from '../utils/cards';
import { GIT_PROVIDERS } from '../enums/utils';

const configSelector = (state: RootState): IConfigState => state.config;

export const selectConfigCardValues = () =>
  createSelector(configSelector, ({ configs: configValues }) => {
    const { HOSTED_ZONE_NAME, GITHUB_HOST, GITHUB_OWNER } = !isEmpty(configValues)
      ? configValues
      : window.__env__ || {};

    const params: CardsContentProps = {
      gitProvider: GITHUB_OWNER ? GIT_PROVIDERS.GITHUB : GIT_PROVIDERS.GITLAB,
      gitHost: GITHUB_HOST,
      gitOwner: GITHUB_OWNER,
      hostedZoneName: HOSTED_ZONE_NAME,
    };

    return buildCardsContent(params);
  });

export const selectConfigClusterName = () =>
  createSelector(
    configSelector,
    ({ configs }) => configs?.CLUSTER_NAME || window.__env__?.CLUSTER_NAME,
  );

export const selectConfigAdminEmail = () =>
  createSelector(
    configSelector,
    ({ configs }) => configs?.ADMIN_EMAIL || window.__env__?.ADMIN_EMAIL,
  );

export const selectHostedZoneName = () =>
  createSelector(
    configSelector,
    ({ configs }) => configs?.HOSTED_ZONE_NAME || window.__env__?.HOSTED_ZONE_NAME,
  );
