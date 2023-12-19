declare namespace NodeJS {
  export interface ProcessEnv {
    readonly API_URL: string;
    readonly CLUSTER_ID: string;
    readonly CLUSTER_TYPE: string;
    readonly DISABLE_TELEMETRY: string;
    readonly INSTALL_METHOD: string;
    readonly IS_CLUSTER_ZERO: string;
    readonly DISABLE_AUTH: string;
    readonly KUBEFIRST_VERSION: string;
    readonly POSTHOG_KEY: string;
    readonly CLIENT_ID: string;
    readonly SECRET_ID: string;
    readonly DOMAIN: string;
    readonly SAAS_URL: string;
  }
}
