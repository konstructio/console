import { ClusterResponse, ManagementCluster, ClusterType } from '../types/provision';

export const mapClusterFromRaw = (cluster: ClusterResponse): ManagementCluster => ({
  id: cluster._id,
  clusterName: cluster.cluster_name,
  adminEmail: cluster.alerts_email,
  cloudProvider: cluster.cloud_provider,
  cloudRegion: cluster.cloud_region,
  domainName: cluster.domain_name,
  gitAuth: cluster.gitAuth,
  gitProvider: cluster.git_provider,
  gitUser: cluster.git_user,
  type: cluster.cluster_type,
  creationDate: cluster.creation_timestamp,
  lastErrorCondition: cluster.last_condition,
  status: cluster.status,
  nodeCount: 2,
  workloadClusters: cluster.workload_clusters.map((item) => ({
    id: item._id,
    clusterName: item.workload_cluster_name,
    cloudRegion: item.cloud_region,
    cloudProvider: cluster.cloud_provider,
    instanceSize: item.instance_size,
    nodeCount: item.node_count,
    environment: item.environment,
    status: item.status,
    type: ClusterType.WORKLOAD,
    domainName: cluster.domain_name,
    gitProvider: cluster.git_provider,
    gitUser: cluster.git_user,
    adminEmail: cluster.alerts_email,
    gitOwner: cluster.gitAuth.gitOwner,
    gitAuth: cluster.gitAuth,
  })),
  vaultAuth: {
    kbotPassword: cluster.vault_auth?.kbot_password,
  },
  checks: {
    install_tools_check: cluster.install_tools_check,
    domain_liveness_check: cluster.domain_liveness_check,
    state_store_creds_check: cluster.state_store_creds_check,
    state_store_create_check: cluster.state_store_create_check,
    git_init_check: cluster.git_init_check,
    kbot_setup_check: cluster.kbot_setup_check,
    gitops_ready_check: cluster.gitops_ready_check,
    git_terraform_apply_check: cluster.git_terraform_apply_check,
    gitops_pushed_check: cluster.gitops_pushed_check,
    cloud_terraform_apply_check: cluster.cloud_terraform_apply_check,
    cluster_secrets_created_check: cluster.cluster_secrets_created_check,
    argocd_install_check: cluster.argocd_install_check,
    argocd_initialize_check: cluster.argocd_initialize_check,
    argocd_create_registry_check: cluster.argocd_create_registry_check,
    argocd_delete_registry_check: cluster.argocd_delete_registry_check,
    vault_initialized_check: cluster.vault_initialized_check,
    vault_terraform_apply_check: cluster.vault_terraform_apply_check,
    users_terraform_apply_check: cluster.users_terraform_apply_check,
  },
});
