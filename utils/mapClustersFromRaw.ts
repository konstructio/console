import {
  ClusterResponse,
  ManagementCluster,
  WorkloadCluster,
  ClusterStatus,
} from '../types/provision';
import { ClusterCache, EnvCache } from '../types/redux';

export const mapClusterFromRaw = (cluster: ClusterResponse) => {
  const managementCluster: ManagementCluster = {
    id: cluster._id,
    clusterId: cluster.cluster_id,
    clusterName: cluster.cluster_name,
    adminEmail: cluster.alerts_email,
    cloudProvider: cluster.cloud_provider,
    cloudRegion: cluster.cloud_region,
    domainName: cluster.domain_name,
    subDomainName: cluster.subdomain_name,
    dnsProvider: cluster.dns_provider,
    logFile: cluster.log_file,
    gitAuth: {
      gitOwner: cluster.git_auth.git_owner,
      gitToken: cluster.git_auth.git_token,
      gitUser: cluster.git_auth.git_username,
    },
    gitProvider: cluster.git_provider,
    gitHost: cluster.git_host,
    gitUser: cluster.git_user,
    type: cluster.cluster_type,
    creationDate: cluster.creation_timestamp,
    lastErrorCondition: cluster.last_condition,
    status: cluster.status,
    nodeCount: cluster.node_count,
    instanceSize: cluster.node_type,
    cloudflare_auth: cluster.cloudflare_auth,
    aws_auth: cluster?.aws_auth,
    civo_auth: cluster?.civo_auth,
    do_auth: cluster?.do_auth,
    vultr_auth: cluster?.vultr_auth,
    google_auth: cluster?.google_auth,
    workloadClusters: [],
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
  };

  const { envCache, workloadClusters, clusterCache } = [
    ...(cluster.workload_clusters ?? []),
  ].reduce<{
    envCache: EnvCache;
    clusterCache: ClusterCache;
    workloadClusters: WorkloadCluster[];
  }>(
    (acc, curVal) => {
      const formattedWorkloadCluster: WorkloadCluster = {
        clusterId: curVal.cluster_id,
        clusterName: curVal.cluster_name,
        cloudRegion: curVal.cloud_region,
        cloudProvider: curVal.cloud_provider,
        dnsProvider: curVal.dns_provider,
        nodeCount: curVal.node_count,
        instanceSize: curVal.node_type,
        creationDate: curVal.creation_timestamp,
        environment: {
          id: curVal.environment?._id ?? '',
          name: curVal.environment?.name ?? '',
          creationDate: curVal.environment?.creation_timestamp ?? '',
          color: curVal.environment?.color ?? 'gray',
        },
        status: curVal.status,
        type: curVal.cluster_type,
        domainName: curVal.domain_name,
        subDomainName: cluster.subdomain_name, // take subdomain from management since we do not store it on the workload cluster
        gitProvider: cluster.git_provider,
        adminEmail: cluster.alerts_email,
        gitAuth: {
          gitOwner: curVal.git_auth.git_owner,
          gitToken: curVal.git_auth.git_token,
          gitUser: curVal.git_auth.git_username,
        },
      };

      acc.workloadClusters.push(formattedWorkloadCluster);

      if (
        curVal.environment &&
        curVal.environment.name &&
        curVal.status !== ClusterStatus.DELETED
      ) {
        acc.envCache[curVal.environment.name] = true;
      }

      acc.clusterCache[curVal.cluster_name] = formattedWorkloadCluster;
      return acc;
    },
    { clusterCache: {}, envCache: {}, workloadClusters: [] },
  );

  managementCluster.workloadClusters = workloadClusters;
  clusterCache[managementCluster.clusterName] = managementCluster;

  return {
    managementCluster,
    envCache,
    clusterCache,
  };
};
