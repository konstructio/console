import { createSelector } from '@reduxjs/toolkit';

import { IConfigState } from '../slices/config.slice';
import { RootState } from '../store';
import { buildCardsContent, CardsContentProps } from '../utils/cards';
import { GIT_PROVIDERS } from '../enums/utils';

const configSelector = (state: RootState): IConfigState => state.config;

export const selectConfigCardValues = () =>
  createSelector(configSelector, ({ configs }) => {
    const {
      HOSTED_ZONE_NAME,
      GITHUB_HOST,
      GITHUB_OWNER,
      ARGO_WORKFLOWS_URL,
      VAULT_URL,
      ARGO_CD_URL,
      ATLANTIS_URL,
      METAPHOR_DEV,
      METAPHOR_GO_DEV,
      METAPHOR_FRONT_DEV,
      METAPHOR_STAGING,
      METAPHOR_GO_STAGING,
      METAPHOR_FRONT_STAGING,
      METAPHOR_PROD,
      METAPHOR_GO_PROD,
      METAPHOR_FRONT_PROD,
    } = configs;

    const params: CardsContentProps = {
      gitProvider: GITHUB_OWNER ? GIT_PROVIDERS.GITHUB : GIT_PROVIDERS.GITLAB,
      gitHost: GITHUB_HOST,
      gitOwner: GITHUB_OWNER,
      hostedZoneName: HOSTED_ZONE_NAME,
      argoWorkflowsUrl: ARGO_WORKFLOWS_URL,
      vaultUrl: VAULT_URL,
      argoUrl: ARGO_CD_URL,
      atlantisUrl: ATLANTIS_URL,
      metaphor: {
        goUrl: METAPHOR_GO_DEV && `${METAPHOR_GO_DEV}/app`,
        nodeJsUrl: METAPHOR_DEV && `${METAPHOR_DEV}/app`,
        reactUrl: METAPHOR_FRONT_DEV,
      },
      metaphorStaging: {
        goUrl: METAPHOR_GO_STAGING && `${METAPHOR_GO_STAGING}/app`,
        nodeJsUrl: METAPHOR_STAGING && `${METAPHOR_STAGING}/app`,
        reactUrl: METAPHOR_FRONT_STAGING,
      },
      metaphorProduction: {
        goUrl: METAPHOR_GO_PROD && `${METAPHOR_GO_PROD}/app`,
        nodeJsUrl: METAPHOR_PROD && `${METAPHOR_PROD}/app`,
        reactUrl: METAPHOR_FRONT_PROD,
      },
    };

    return buildCardsContent(params);
  });

export const selectConfigClusterName = () =>
  createSelector(configSelector, ({ configs }) => configs?.CLUSTER_NAME);

export const selectConfigAdminEmail = () =>
  createSelector(configSelector, ({ configs }) => configs?.ADMIN_EMAIL);

export const selectHostedZoneName = () =>
  createSelector(configSelector, ({ configs }) => configs?.HOSTED_ZONE_NAME);
