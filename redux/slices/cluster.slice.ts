import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getClusterServices,
  getMarketplaceApps,
  installMarketplaceApp,
} from '../../redux/thunks/api.thunk';
import { Cluster, ClusterServices } from '../../types/provision';
import { MarketplaceApp } from '../../types/marketplace';

export interface ConfigState {
  selectedCluster?: Cluster;
  clusterServices: Array<ClusterServices>;
  marketplaceApps: Array<MarketplaceApp>;
}

export const initialState: ConfigState = {
  selectedCluster: undefined,
  clusterServices: [
    {
      name: 'Argo CD',
      default: true,
      description:
        'A GitOps oriented continuous delivery tool for managing all of our applications across our Kubernetes clusters.',
      image: 'https://assets.kubefirst.com/console/argocd.svg',
      links: ['https://argocd.kubesecond.net'],
      status: '',
    },
    {
      name: 'Argo Workflows',
      default: true,
      description: 'The workflow engine for orchestrating parallel jobs on Kubernetes.',
      image: 'https://assets.kubefirst.com/console/argocd.svg',
      links: ['https://argo.kubesecond.net/workflows'],
      status: '',
    },
    {
      name: 'Atlantis',
      default: true,
      description: 'Kubefirst manages Terraform workflows with Atlantis automation.',
      image: 'https://assets.kubefirst.com/console/atlantis.svg',
      links: ['https://atlantis.kubesecond.net'],
      status: '',
    },
    {
      name: 'github',
      default: true,
      description:
        'The git repositories contain all the Infrastructure as Code and GitOps configurations.',
      image: 'https://assets.kubefirst.com/console/github.svg', // or gitlab https://assets.kubefirst.com/console/gitlab.svg
      links: [
        'https://github.com/kubefirst-test/gitops',
        'https://github.com/kubefirst-test/metaphor',
      ],
      status: '',
    },
    {
      name: 'Metaphor',
      default: true,
      description:
        "A multi-environment demonstration space for frontend application best practices that's easy to apply to other projects.",
      image: 'https://assets.kubefirst.com/console/metaphor.svg',
      links: [
        'https://metaphor-development.kubesecond.net',
        'https://metaphor-staging.kubesecond.net',
        'https://metaphor-production.kubesecond.net',
      ],
      status: '',
    },
    {
      name: 'Vault',
      default: true,
      description: "Kubefirst's secrets manager and identity provider.",
      image: 'https://assets.kubefirst.com/console/vault.svg',
      links: ['https://vault.kubesecond.net'],
      status: '',
    },
  ],
  marketplaceApps: [],
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    setSelectedCluster: (state, { payload: cluster }: PayloadAction<Cluster>) => {
      state.selectedCluster = cluster;
    },
    addMarketplaceApp: (state, { payload: app }: PayloadAction<MarketplaceApp>) => {
      console.log(app);
      const { name, description, image_url } = app;
      state.clusterServices.push({
        default: false,
        description: description as string,
        name,
        image: image_url,
        links: [],
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterServices.fulfilled, (state, { payload }) => {
        state.clusterServices = payload;
      })
      .addCase(installMarketplaceApp.fulfilled, (state, { payload }) => {
        const { name, description, image_url } = payload;
        state.clusterServices.push({
          default: false,
          description: description as string,
          name,
          image: image_url,
          links: [],
        });
      })
      .addCase(
        getMarketplaceApps.fulfilled,
        (state, { payload }: PayloadAction<Array<MarketplaceApp>>) => {
          state.marketplaceApps = payload;
        },
      );
  },
});

export const { addMarketplaceApp, setSelectedCluster } = clusterSlice.actions;

export const clusterReducer = clusterSlice.reducer;
