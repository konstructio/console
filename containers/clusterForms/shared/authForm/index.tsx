import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';

import { Required } from '../../../../components/textField/textField.styled';
import GitProviderButton from '../../../../components/gitProviderButton';
import Typography from '../../../../components/typography';
import { useInstallation } from '../../../../hooks/useInstallation';
// import LearnMore from '../../../../components/learnMore';
import ControlledPassword from '../../../../components/controlledFields/Password';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledTextArea from '../../../../components/controlledFields/textArea';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { GIT_PROVIDERS, GitProvider } from '../../../../types';
import { InstallValues, InstallationType } from '../../../../types/redux/index';
import { FormStep } from '../../../../constants/installation';
import { EXCLUSIVE_PLUM, VOLCANIC_SAND } from '../../../../constants/colors';
import {
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitLabProjects,
  getGitLabSubgroups,
  getGithubUser,
  getGithubUserOrganizations,
  getGitlabGroups,
  getGitlabUser,
} from '../../../../redux/thunks/git.thunk';
import {
  setToken,
  clearUserError,
  setGitOwner,
  clearGitState,
  setIsGitSelected,
} from '../../../../redux/slices/git.slice';
import { setGitProvider } from '../../../../redux/slices/installation.slice';

import { FormContainer, GitContainer, GitUserField, GitUserFieldInput } from './authForm.styled';

import Tooltip from '@/components/tooltip';
import Row from '@/components/row';
import CheckBoxWithRef from '@/components/checkbox';
import Column from '@/components/column';

const AuthForm: FunctionComponent = () => {
  const [isGitRequested, setIsGitRequested] = useState<boolean>();
  const [gitUserName, setGitUserName] = useState<string>();
  const [showGoogleKeyFile, setShowGoogleKeyFile] = useState(false);

  const dispatch = useAppDispatch();

  const {
    gitProvider,
    githubUser,
    githubUserOrganizations,
    gitlabUser,
    gitlabGroups,
    gitStateLoading,
    installationType,
    isGitSelected,
    isTokenValid,
    installMethod,
    token = '',
  } = useAppSelector(({ config, installation, git }) => ({
    currentStep: installation.installationStep,
    installationType: installation.installType,
    gitProvider: installation.gitProvider,
    isGitSelected: git.isGitSelected,
    gitStateLoading: git.isLoading,
    installMethod: config.installMethod,
    ...git,
  }));

  const { apiKeyInfo } = useInstallation(
    installationType as InstallationType,
    gitProvider as GitProvider,
    FormStep.AUTHENTICATION,
  );

  const {
    control,
    reset,
    setValue,
    formState: { errors },
  } = useFormContext<InstallValues>();

  const isGitHub = useMemo(() => gitProvider === GitProvider.GITHUB, [gitProvider]);

  const validateGitOwner = async (gitOwner: string) => {
    dispatch(setGitOwner(gitOwner));
    dispatch(clearUserError());

    if (gitOwner) {
      if (isGitHub) {
        await dispatch(getGitHubOrgRepositories({ token, organization: gitOwner })).unwrap();
        await dispatch(getGitHubOrgTeams({ token, organization: gitOwner }));
      } else {
        await dispatch(getGitLabProjects({ token, group: gitOwner })).unwrap();
        await dispatch(getGitLabSubgroups({ token, group: gitOwner }));
      }
    }
  };

  const handleGitTokenBlur = async (token: string) => {
    dispatch(setToken(token));
    setIsGitRequested(true);

    if (isGitHub) {
      // only care about return of getGithubUser as if it fails will exit and not run getGithubUserOrganizations
      await dispatch(getGithubUser(token)).unwrap();
      await dispatch(getGithubUserOrganizations(token));
    } else {
      // only care about return of getGitlabUser as if it fails will exit and not run getGitlabGroups
      await dispatch(getGitlabUser(token)).unwrap();
      await dispatch(getGitlabGroups(token));
    }
  };

  const gitLabel = useMemo(() => (isGitHub ? 'GitHub' : 'GitLab'), [isGitHub]);

  const isMarketplace = useMemo(() => installMethod?.includes('marketplace'), [installMethod]);

  const handleGitProviderChange = (provider: GitProvider) => {
    setGitUserName('');
    reset({ gitToken: '', gitOwner: '' });
    dispatch(clearGitState());
    dispatch(setIsGitSelected(true));
    dispatch(setGitProvider(provider));
  };

  const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGoogleKeyFile(e.target.checked);
  }, []);

  useEffect(() => {
    if (githubUser?.login || gitlabUser?.name) {
      setGitUserName(githubUser?.login || gitlabUser?.name);
    }
  }, [dispatch, githubUser, gitlabUser, setValue]);

  useEffect(() => {
    return () => {
      dispatch(clearUserError());
    };
  }, [dispatch]);

  const showTooltip = useMemo(() => (gitUserName?.length ?? 0) > 22, [gitUserName]);

  return (
    <>
      {isMarketplace && (
        <div>
          <Typography
            variant="labelLarge"
            color={EXCLUSIVE_PLUM}
            sx={{ display: 'flex', gap: '6px' }}
          >
            Select your preferred GIT provider <Required>*</Required>
          </Typography>
          <GitContainer>
            {GIT_PROVIDERS.map((provider) => (
              <GitProviderButton
                key={provider}
                option={provider}
                active={provider === gitProvider && isGitSelected}
                onClick={() => handleGitProviderChange(provider)}
              />
            ))}
          </GitContainer>
        </div>
      )}
      <FormContainer isVisible={!isMarketplace || (isMarketplace && isGitSelected)}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row style={{ width: '432px' }}>
            <ControlledPassword
              control={control}
              name="gitToken"
              label={`${gitLabel} personal access token`}
              required
              rules={{
                required: true,
              }}
              error={isGitRequested && !gitStateLoading && !isTokenValid}
              onBlur={handleGitTokenBlur}
              onErrorText="Invalid token."
            />
          </Row>
          <GitUserField data-test-id="gitUser" style={{ width: '216px' }}>
            <Typography
              variant="labelLarge"
              sx={{ display: 'flex', gap: '4px' }}
              color={EXCLUSIVE_PLUM}
            >{`${gitLabel} username`}</Typography>
            {showTooltip ? (
              <Tooltip title={gitUserName}>
                <GitUserFieldInput>{gitUserName}</GitUserFieldInput>
              </Tooltip>
            ) : (
              <GitUserFieldInput>{gitUserName}</GitUserFieldInput>
            )}
          </GitUserField>
        </Row>

        {isGitHub ? (
          <ControlledAutocomplete
            control={control}
            required
            name="gitOwner"
            rules={{ required: true }}
            onChange={validateGitOwner}
            options={
              githubUserOrganizations &&
              githubUserOrganizations.map(({ login }) => ({ label: login, value: login }))
            }
            loading={gitStateLoading}
            label="GitHub organization name"
          />
        ) : (
          <ControlledAutocomplete
            control={control}
            required
            name="gitOwner"
            rules={{ required: true }}
            onChange={validateGitOwner}
            options={
              gitlabGroups && gitlabGroups.map(({ name, path }) => ({ label: name, value: path }))
            }
            loading={gitStateLoading}
            label="GitLab group name"
          />
        )}
        {installationType === InstallationType.GOOGLE && (
          <>
            <Column style={{ gap: '10px' }}>
              <ControlledTextArea
                control={control}
                name="google_auth.key_file"
                label="Google Cloud key file"
                rules={{ required: 'key file is required' }}
                required
                minRows={14}
                onErrorText={errors.google_auth?.key_file?.message}
                textAreaStyleOverrides={{ maxHeight: '266px' }}
                hideValue={!showGoogleKeyFile}
              />

              <FormControlLabel
                data-test-id="showGoogleKeyFile"
                control={<CheckBoxWithRef checked={showGoogleKeyFile} onChange={handleCheckbox} />}
                label={
                  <Typography variant="body2" sx={{ ml: '8px' }} color={VOLCANIC_SAND}>
                    Show key file
                  </Typography>
                }
                sx={{ ml: '16px' }}
              />
            </Column>

            <ControlledTextField
              control={control}
              name="google_auth.project_id"
              label="Project ID"
              rules={{ required: 'project id is required' }}
              required
              helperText="Retrieve the Project ID from the project Dashboard “Project info” card"
              onErrorText={errors.google_auth?.project_id?.message}
            />
          </>
        )}
        {apiKeyInfo?.fieldKeys.map(({ label, name, helperText }) => (
          <ControlledPassword
            key={name}
            control={control}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            name={`${apiKeyInfo.authKey}.${name}`}
            label={label}
            helperText={helperText}
            required
            rules={{
              required: true,
            }}
          />
        ))}
      </FormContainer>
      {/* <LearnMore description="Learn more about" href="" linkTitle="authentication" /> */}
    </>
  );
};

export default AuthForm;
