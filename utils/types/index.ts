import { GitProvider } from '@/types';
import { InstallationType } from '@/types/redux';

export function isGitProvider(arg: unknown): arg is GitProvider {
  return typeof arg === 'string' && (arg === GitProvider.GITHUB || arg === GitProvider.GITLAB);
}

export function isInstallationType(arg: unknown): arg is InstallationType {
  return (
    typeof arg === 'string' &&
    (arg === InstallationType.AWS ||
      arg === InstallationType.CIVO ||
      arg === InstallationType.DIGITAL_OCEAN ||
      arg === InstallationType.GOOGLE ||
      arg === InstallationType.VULTR ||
      arg === InstallationType.LOCAL)
  );
}
