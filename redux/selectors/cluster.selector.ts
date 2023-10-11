import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';

const clusterSelector = (state: RootState) => state.cluster;

export const selectCluster = () => createSelector(clusterSelector, (cluster) => cluster);
