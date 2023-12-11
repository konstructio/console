// https://docs.digitalocean.com/reference/api/api-reference/#operation/account_get
export type DigitalOceanUser = {
  droplet_limit: number;
  floating_ip_limit: number;
  email: string;
  name: string;
  uuid: string;
  email_verified: boolean;
  status: string;
  status_message: string;
  team: {
    uuid: string;
    name: string;
  };
};
