'use client';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormFooter,
  FormHeader,
  GitFieldsContainer,
  GitUserField,
  GitUserFieldInput,
  Header,
  HeadingContainer,
} from './GitAccount.styled';

import Typography from '@/components/Typography/Typography';
import LearnMore from '@/components/LearnMore/LearnMore';
import { useAppSelector } from '@/redux/store';
import FormContainer from '@/components/FormContainer/FormContainer';
import Column from '@/components/Column/Column';
import Row from '@/components/Row/Row';
import Button from '@/components/Button/Button';
import useToggle from '@/hooks/useToggle';
import GitProviderLabel from '@/components/GitProviderLabel/GitProviderLabel';
import { GitProvider } from '@/types';
import { EXCLUSIVE_PLUM, VOLCANIC_SAND } from '@/constants/colors';
import ControlledPassword from '@/components/controlledFields/ControlledPassword';
import { GIT_PROVIDER_DISPLAY_NAME } from '@/constants';
import Tooltip from '@/components/Tooltip/Tooltip';
import ControlledTextField from '@/components/controlledFields/ControlledTextField/ControlledTextField';

type GitAccountFields = {
  gitToken?: string;
  gitProvider?: string;
  gitOrg?: string;
  gitRepo?: string;
};

const GitAccount: FunctionComponent = () => {
  const { managementCluster, githubUser, gitlabUser } = useAppSelector(({ api, git }) => ({
    ...api,
    ...git,
  }));

  const { isOpen, toggle } = useToggle();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GitAccountFields>({
    values: {
      gitToken: managementCluster?.gitAuth.gitToken,
      gitProvider: managementCluster?.gitProvider,
      gitOrg: managementCluster?.gitAuth.gitOwner,
      gitRepo: managementCluster?.gitHost,
    },
    mode: 'onSubmit',
  });

  const handleFormSubmit = useCallback((values: GitAccountFields) => {
    // TODO: Handle submit
  }, []);

  const handleEdit = useCallback(() => {
    reset(undefined, { keepErrors: false, keepDirty: false });
    toggle();
  }, [reset, toggle]);

  const gitUserName = useMemo(
    () => githubUser?.login || gitlabUser?.name,
    [githubUser, gitlabUser],
  );

  const gitLabel = useMemo(
    () => GIT_PROVIDER_DISPLAY_NAME[managementCluster?.gitProvider as GitProvider],
    [managementCluster?.gitProvider],
  );

  const showTooltip = useMemo(() => (gitUserName?.length ?? 0) > 22, [gitUserName]);

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Header>
        <HeadingContainer>
          <Typography variant="h6" color={VOLCANIC_SAND}>
            Git account
          </Typography>
          <LearnMore description="Manage your git account." linkTitle="Learn more" href="#" />
        </HeadingContainer>
      </Header>
      <FormContainer
        headerContent={
          <FormHeader>
            <Typography variant="subtitle2" color={VOLCANIC_SAND}>
              Account details
            </Typography>
            {!isOpen && (
              <Button color="secondary" variant="outlined" type="button" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </FormHeader>
        }
        footerContent={
          isOpen ? (
            <FormFooter>
              <Button color="text" type="button" onClick={toggle}>
                Cancel
              </Button>
              <Button color="secondary" variant="outlined" type="submit">
                Save
              </Button>
            </FormFooter>
          ) : null
        }
      >
        <Column style={{ gap: 24 }}>
          <Column style={{ gap: 8 }}>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              Git provider
            </Typography>
            <GitProviderLabel
              gitProvider={managementCluster?.gitProvider as GitProvider}
              withIcon
            />
          </Column>
          <Row>
            <GitFieldsContainer>
              <Row style={{ flex: 1 }}>
                <ControlledPassword
                  control={control}
                  name="gitToken"
                  label={`${gitLabel} personal access token`}
                  required
                  rules={{
                    required: 'Required.',
                  }}
                  disabled={!isOpen}
                  onErrorText={errors.gitToken?.message}
                />
              </Row>
              <GitUserField>
                <Typography
                  variant="labelLarge"
                  sx={{ display: 'flex', gap: '4px' }}
                  color={EXCLUSIVE_PLUM}
                >{`Username associated with ${gitLabel} token`}</Typography>
                {showTooltip ? (
                  <Tooltip title={gitUserName}>
                    <GitUserFieldInput>{gitUserName}</GitUserFieldInput>
                  </Tooltip>
                ) : (
                  <GitUserFieldInput>{gitUserName}</GitUserFieldInput>
                )}
              </GitUserField>
            </GitFieldsContainer>
          </Row>
          <ControlledTextField
            control={control}
            name="gitProvider"
            label="Git hostname"
            required
            rules={{
              required: 'Required.',
            }}
            disabled={!isOpen}
            onErrorText={errors.gitProvider?.message}
          />
          <ControlledTextField
            control={control}
            name="gitOrg"
            label={`${gitLabel} organization name`}
            required
            rules={{
              required: 'Required.',
            }}
            disabled={!isOpen}
            onErrorText={errors.gitOrg?.message}
          />
          <ControlledTextField
            control={control}
            name="gitRepo"
            label="Repository name"
            required
            rules={{
              required: 'Required.',
            }}
            disabled={!isOpen}
            onErrorText={errors.gitRepo?.message}
          />
        </Column>
      </FormContainer>
    </Form>
  );
};

export default GitAccount;
