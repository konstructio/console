import React from 'react';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowClassNameParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import moment from 'moment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Tag, { TagColor } from '../../components/tag';
import Typography from '../../components/typography';
import { Cluster, ClusterStatus } from '../../types/provision';
import Menu from '../../components/menu';
import { CLUSTER_MENU_OPTIONS } from '../../constants/cluster';

const TAG_MAP: Record<ClusterStatus, string | undefined> = {
  [ClusterStatus.DELETED]: undefined,
  [ClusterStatus.DELETING]: 'pink',
  [ClusterStatus.ERROR]: undefined,
  [ClusterStatus.PROVISIONED]: undefined,
  [ClusterStatus.PROVISIONING]: 'green',
};

const isClusterDisabled = (status: ClusterStatus) =>
  [ClusterStatus.DELETING, ClusterStatus.PROVISIONING].includes(status);

export const getClusterState = ({ row }: GridRowClassNameParams<Cluster>) => {
  if (isClusterDisabled(row.status as ClusterStatus)) {
    return 'disableClusterRow';
  }

  return '';
};

export const getClusterManagementColumns = (
  onClick: (label: string, row: Cluster) => void,
): GridColDef[] => [
  {
    field: 'clusterName',
    headerName: 'Cluster Name',
    sortable: false,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams<Cluster>) => {
      const tagColor = TAG_MAP[row.status as ClusterStatus];
      return (
        <>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {row.clusterName}
          </Typography>
          {tagColor && <Tag text={row.status as string} bgColor={tagColor as TagColor} />}
        </>
      );
    },
  },
  {
    field: 'creationDate',
    headerName: 'Created On',
    sortable: false,
    valueGetter: ({ row }: GridValueGetterParams<Cluster>) =>
      moment(new Date(row.creationDate as string)).format('DD MMM YYYY, HH:mm:ss'),
    width: 368,
    flex: 1,
  },
  { field: 'gitUser', headerName: 'Created By', sortable: false, flex: 1 },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    flex: 1,
    maxWidth: 86,
    renderCell: ({ row }: GridRenderCellParams<Cluster>) => {
      const isDisabled = isClusterDisabled(row.status as ClusterStatus);

      return (
        <Menu
          isDisabled={isDisabled}
          onClickMenu={(label) => onClick(label, row)}
          label={<MoreHorizIcon />}
          options={CLUSTER_MENU_OPTIONS}
        />
      );
    },
  },
];
