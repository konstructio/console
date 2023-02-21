import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Snackbar } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import useToggle from '../../hooks/useToggle';
import useStep from '../../hooks/useStep';
import Progress from '../../components/progress';
import Typography from '../../components/typography';
import useInstallation, {
  FormFlowByType,
  InstallationTypes,
  titleBySteps,
} from '../../hooks/useInstallation';
import Button from '../../components/button';
import { useAppDispatch } from '../../redux/store';
import { setAWSGitValues, setLocalValues } from '../../redux/slices/installation.slice';

import {
  Card,
  CardContainer,
  CardDescription,
  CardInfo,
  CardInfoHeader,
  CardLink,
  CartTitle,
  Code,
  Content,
  Footer,
  Form,
  InfoContainer,
  Title,
} from './dashboard.styled';

const CARD_ITEMS = [
  {
    description: 'Explore all you can do with Kubefirst with no costs by running locally.',
    title: 'Run Locally',
    type: InstallationTypes.LOCAL,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitHub',
    type: InstallationTypes.AWS_GITHUB,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitLab',
    type: InstallationTypes.AWS_GITLAB,
  },
];

const Dashboard: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isOpen, open, close } = useToggle(false);
  const { currentStep, goToNext, goToPrev } = useStep();
  const { info, steps, installationType, onChangeInstallationType } = useInstallation();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    trigger,
    watch,
    setValue,
    clearErrors,
  } = useForm();

  const isLastStep = useMemo(() => currentStep === steps.length - 1, [currentStep, steps]);

  const isInfoListDescription = useMemo(
    () => info?.description && Array.isArray(info?.description),
    [info?.description],
  );

  const title = useMemo(() => {
    const titlesByStep = titleBySteps[installationType] || {};
    return titlesByStep[currentStep];
  }, [currentStep, installationType]);

  const onFinish = () => {
    router.push('/services');
  };

  const onSubmit = (fieldValues: FieldValues) => {
    if (isValid) {
      switch (installationType) {
        case InstallationTypes.LOCAL:
          dispatch(setLocalValues({ step: currentStep, ...fieldValues }));
          break;
        case InstallationTypes.AWS_GITHUB:
        case InstallationTypes.AWS_GITLAB:
          dispatch(setAWSGitValues({ step: currentStep, ...fieldValues }));
          break;
        default:
          break;
      }

      goToNext();
    }
  };

  const FormFlowComponent = useMemo(() => FormFlowByType[installationType], [installationType]);

  useEffect(() => {
    reset();
  }, [reset, installationType, currentStep]);

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <Progress activeStep={currentStep} steps={steps} />
      <Title>
        <Typography variant="h6">{title || `First, choose your Kubefirst adventure`}</Typography>
      </Title>
      <Content>
        {currentStep === 0 ? (
          <>
            <CardContainer>
              {CARD_ITEMS.map(({ description, title, type }) => {
                const isActive = installationType === type;
                const isDescriptionList = Array.isArray(description);

                return (
                  <Card
                    key={title}
                    onClick={() => onChangeInstallationType(type)}
                    isActive={isActive}
                  >
                    <CartTitle>
                      <Typography variant="h6">{title}</Typography>
                    </CartTitle>
                    <CardDescription isActive={isActive}>
                      {isDescriptionList ? (
                        <ol type="1">
                          {description.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ol>
                      ) : (
                        <Typography variant="body2" sx={{ letterSpacing: 0 }}>
                          {description}
                        </Typography>
                      )}
                    </CardDescription>
                  </Card>
                );
              })}
            </CardContainer>
            <InfoContainer>
              <CardInfo>
                <CardInfoHeader>
                  <InfoOutlinedIcon htmlColor="#2563EB" />
                  <Typography variant="subtitle3">{info?.title}</Typography>
                </CardInfoHeader>
                <CardDescription>
                  {isInfoListDescription ? (
                    <ol type="1">
                      {(info?.description as string[]).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <Typography variant="body2">{info?.description}</Typography>
                  )}
                </CardDescription>
                {info?.code && (
                  <Code>
                    <Typography variant="body2">{info?.code}</Typography>
                    <CopyToClipboard text={info?.code} onCopy={open}>
                      <ContentCopyOutlinedIcon />
                    </CopyToClipboard>
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      open={isOpen}
                      autoHideDuration={3000}
                      onClose={close}
                      message="Copied!"
                    />
                  </Code>
                )}
                <CardLink href={info?.ctaLink}>
                  <Typography variant="tooltip">{info?.ctaDescription}</Typography>
                  <LaunchOutlinedIcon fontSize="small" />
                </CardLink>
              </CardInfo>
            </InfoContainer>
          </>
        ) : (
          <FormFlowComponent
            control={control}
            setValue={setValue}
            step={currentStep}
            trigger={trigger}
            watch={watch}
            clearErrors={clearErrors}
          />
        )}
      </Content>
      <Footer>
        {isLastStep ? (
          <Button variant="contained" color="primary" onClick={onFinish}>
            Close
          </Button>
        ) : (
          <>
            {currentStep > 0 && (
              <Button variant="outlined" color="secondary" onClick={goToPrev}>
                Back
              </Button>
            )}
            <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
              Next
            </Button>
          </>
        )}
      </Footer>
    </Form>
  );
};

export default Dashboard;
