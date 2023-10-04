import { EnvironmentResponse, ClusterEnvironment } from '../types/provision';

export const mapEnvironmentFromRaw = ({
  creation_timestamp,
  _id,
  ...rest
}: EnvironmentResponse): ClusterEnvironment => ({
  ...rest,
  id: _id,
  creationDate: creation_timestamp,
});
