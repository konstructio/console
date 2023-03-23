import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const githubSelector = (state: RootState) => state.github;

export const selectGithubUser = () => createSelector(githubSelector, ({ user }) => user || {});

export const selectIsValidToken = () =>
  createSelector(githubSelector, ({ isTokenValid }) => !!isTokenValid);

export const selectGitUserOrganizations = () =>
  createSelector(githubSelector, ({ organizations }) => organizations || []);

export const selectIsLoading = () => createSelector(githubSelector, ({ isLoading }) => !!isLoading);
