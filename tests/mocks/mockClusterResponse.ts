import { ClusterResponse, ClusterStatus, ClusterType } from '../../types/provision';
import { InstallationType } from '../../types/redux';

export const mockClusterResponse: ClusterResponse = {
  _id: '64c2ec0b057c0e84e1738aaa',
  creation_timestamp: '1693932566',
  status: ClusterStatus.PROVISIONED,
  last_condition: '',
  in_progress: false,
  alerts_email: 'derrick@kubeshop.io',
  cloud_provider: InstallationType.CIVO,
  cloud_region: 'NYC1',
  cluster_name: 'k-ray-space-export-2',
  cluster_id: '4dg3dv',
  cluster_type: ClusterType.MANAGEMENT,
  domain_name: 'k-ray.space',
  subdomain_name: '',
  dns_provider: 'civo',
  git_provider: 'github',
  git_host: 'github.com',
  git_user: 'D-B-Hawk',
  node_type: 'g3.large',
  node_count: 4,
  workload_clusters: [
    {
      admin_email: 'derrick@kubeshop.io',
      cloud_provider: InstallationType.AWS,
      domain_name: 'kgetpods.biz',
      subdomain_name: '',
      cluster_id: 'nice',
      creation_timestamp: '1693932566',
      dns_provider: 'civo',
      cluster_name: 'worker-1',
      cloud_region: 'LON1',
      instance_size: '8 GPU',
      node_count: 3,
      environment: {
        _id: '1',
        creation_timestamp: '1693932566',
        name: 'preprod',
        color: 'gold',
      },
      status: ClusterStatus.PROVISIONING,
      cluster_type: ClusterType.WORKLOAD_V_CLUSTER,
      git_auth: {
        git_owner: 'D-B-Hawk',
        git_token: 'superSecretToken',
        git_username: 'D-B-Hawk',
      },
      node_type: 'super',
    },
    {
      admin_email: 'derrick@kubeshop.io',
      cloud_provider: InstallationType.DIGITAL_OCEAN,
      domain_name: 'kgetpods.biz',
      subdomain_name: '',
      cluster_id: 'one',
      creation_timestamp: '1693932566',
      dns_provider: 'civo',
      cluster_name: 'worker-2',
      cloud_region: 'LON1',
      instance_size: '8 GPU',
      node_count: 3,
      environment: {
        _id: '2',
        creation_timestamp: '1693932566',
        name: 'preprod',
        color: 'gold',
      },
      status: ClusterStatus.PROVISIONED,
      cluster_type: ClusterType.WORKLOAD,
      git_auth: {
        git_owner: 'D-B-Hawk',
        git_token: 'superSecretToken',
        git_username: 'D-B-Hawk',
      },
      node_type: 'g3.large',
    },
    {
      admin_email: 'derrick@kubeshop.io',
      cloud_provider: InstallationType.LOCAL,
      domain_name: 'kgetpods.biz',
      subdomain_name: '',
      cluster_id: 'three',
      creation_timestamp: '1693932566',
      dns_provider: 'civo',
      cluster_name: 'worker-3',
      cloud_region: 'LON1',
      instance_size: '8 GPU',
      node_count: 3,
      environment: {
        _id: '3',
        creation_timestamp: '1693932566',
        name: 'preprod',
        color: 'gold',
      },
      status: ClusterStatus.PROVISIONED,
      cluster_type: ClusterType.WORKLOAD,
      git_auth: {
        git_owner: 'D-B-Hawk',
        git_token: 'superSecretToken',
        git_username: 'D-B-Hawk',
      },
      node_type: 'g3.large',
    },
    {
      admin_email: 'derrick@kubeshop.io',
      cloud_provider: InstallationType.GOOGLE,
      domain_name: 'kgetpods.biz',
      subdomain_name: '',
      cluster_id: 'four',
      creation_timestamp: '1693932566',
      dns_provider: 'civo',
      cluster_name: 'worker-4',
      cloud_region: 'LON1',
      instance_size: '8 GPU',
      node_count: 3,
      environment: {
        _id: '4',
        creation_timestamp: '1693932566',
        name: 'preprod',
        color: 'gold',
      },
      status: ClusterStatus.PROVISIONED,
      cluster_type: ClusterType.WORKLOAD,
      git_auth: {
        git_owner: 'D-B-Hawk',
        git_token: 'superSecretToken',
        git_username: 'D-B-Hawk',
      },
      node_type: 'g3.large',
    },
  ],
  git_auth: {
    git_owner: 'D-B-Hawk',
    git_token: 'superSecretToken',
    git_username: 'D-B-Hawk',
  },
  vault_auth: {
    kbot_password: 'superSecretPassword',
  },
  install_tools_check: true,
  domain_liveness_check: true,
  state_store_creds_check: true,
  state_store_create_check: true,
  git_init_check: true,
  kbot_setup_check: true,
  gitops_ready_check: true,
  git_terraform_apply_check: false,
  gitops_pushed_check: true,
  cloud_terraform_apply_check: false,
  cluster_secrets_created_check: true,
  argocd_install_check: true,
  argocd_initialize_check: true,
  argocd_create_registry_check: true,
  argocd_delete_registry_check: true,
  vault_initialized_check: true,
  vault_terraform_apply_check: true,
  users_terraform_apply_check: true,
};
