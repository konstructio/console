import { InstallationType } from '../types/redux';

export const formatCloudProvider = (cloudProvider?: string) => {
  return (
    cloudProvider && cloudProvider.replace(InstallationType.CIVO_MARKETPLACE, InstallationType.CIVO)
  );
};
