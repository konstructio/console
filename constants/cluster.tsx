import { FIRE_BRICK } from './colors';

export const VIEW_DETAILS_OPTION = 'View details';
export const DELETE_OPTION = 'Delete cluster';
export const CLUSTER_MENU_OPTIONS = [
  { label: VIEW_DETAILS_OPTION },
  { label: DELETE_OPTION, color: FIRE_BRICK },
];

export const CLUSTER_CHECKS: { [key: string]: string } = {
  install_tools_check: 'Installing tools',
  domain_liveness_check: 'Domain liveness check',
  git_init_check: 'Initializing git',
  kbot_setup_check: 'Kbot setup',
  gitops_ready_check: 'Initializing gitops',
  git_terraform_apply_check: 'Git terraform apply',
  gitops_pushed_check: 'Gitops repos pushed',
  cloud_terraform_apply_check: 'Cloud terraform apply',
  cluster_secrets_created_check: 'Cretating cluster secrets',
  argocd_install_check: 'Installing argocd',
  argocd_initialize_check: 'Initializing argocd',
  argocd_create_registry_check: 'Create argocd registry',
  argocd_delete_registry_check: 'Delete argocd registry',
  vault_initialized_check: 'Initializing vault',
  vault_terraform_apply_check: 'Vault terraform apply',
  users_terraform_apply_check: 'Users terraform apply',
};
