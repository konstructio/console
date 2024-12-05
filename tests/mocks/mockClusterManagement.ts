import { GitProvider } from '../../types';
import { ClusterStatus, ClusterType, ManagementCluster } from '../../types/provision';
import { InstallationType } from '../../types/redux';

export const mockClusterManagement: ManagementCluster = {
  // From Cluster interface
  adminEmail: 'admin@example.com',
  cloudProvider: InstallationType.AWS,
  type: ClusterType.MANAGEMENT,
  clusterId: 'cluster-123',
  clusterName: 'test-cluster',
  cloudRegion: 'us-east-1',
  creationDate: '2024-03-19',
  domainName: 'example.com',
  subDomainName: 'test',
  dnsProvider: 'cloudflare',
  gitProvider: GitProvider.GITHUB,
  instanceSize: 't3.large',
  nodeCount: 3,
  status: ClusterStatus.PROVISIONED,
  logFile: '/var/log/test.log',
  gitAuth: {
    gitOwner: 'owner',
    gitToken: 'token123',
    gitUser: 'user',
  },

  // From Row interface (assuming it requires an id)
  id: '64c2ec0b057c0e84e1738aaa',

  // ManagementCluster specific
  lastErrorCondition: '',
  gitHost: 'github.com',
  vaultAuth: {
    kbotPassword: 'password123',
  },
  checks: {
    install_tools_check: true,
    domain_liveness_check: true,
    state_store_creds_check: true,
    state_store_create_check: true,
    git_init_check: true,
    kbot_setup_check: true,
    gitops_ready_check: true,
    git_terraform_apply_check: true,
    gitops_pushed_check: true,
    cloud_terraform_apply_check: true,
    cluster_secrets_created_check: true,
    argocd_install_check: true,
    argocd_initialize_check: true,
    argocd_create_registry_check: true,
    argocd_delete_registry_check: true,
    vault_initialized_check: true,
    vault_terraform_apply_check: true,
    users_terraform_apply_check: true,
  },
};
