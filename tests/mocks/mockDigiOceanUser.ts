import { DigitalOceanUser } from '../../types/digitalOcean';

export const mockDigiOceanUser: DigitalOceanUser = {
  droplet_limit: 25,
  floating_ip_limit: 5,
  email: 'sammy@digitalocean.com',
  name: 'Sammy the Shark',
  uuid: 'b6fr89dbf6d9156cace5f3c78dc9851d957381ef',
  email_verified: true,
  status: 'active',
  status_message: ' ',
  team: {
    uuid: '5df3e3004a17e242b7c20ca6c9fc25b701a47ece',
    name: 'My Team',
  },
};
