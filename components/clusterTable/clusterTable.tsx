import React, { useState, FunctionComponent, useMemo, ComponentPropsWithRef } from 'react';
import { ClickAwayListener } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TableSortLabel from '@mui/material/TableSortLabel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import moment from 'moment';

import k3dLogo from '../../assets/k3d_logo.svg';
import awsLogo from '../../assets/aws_logo.svg';
import civoLogo from '../../assets/civo_logo.svg';
import digitalOceanLogo from '../../assets/digital_ocean_logo.svg';
import vultrLogo from '../../assets/vultr_logo.svg';
import googleCloudLogo from '../../assets/googleCloud.svg';
import { CLUSTER_TAG_CONFIG } from '../../constants';
import { DODGER_BLUE, FIRE_BRICK } from '../../constants/colors';
import {
  ManagementCluster,
  ClusterStatus,
  ClusterType,
  Cluster,
  DraftCluster,
} from '../../types/provision';
import { ClusterCache, InstallationType } from '../../types/redux';
import Typography from '../../components/typography';
import { noop } from '../../utils/noop';
import Tag from '../tag';
import { NestedKeyOf } from '../../types';
import { descendingComparator } from '../../utils/descendingComparator';

import {
  StyledTableRow,
  StyledTableCell,
  StyledTag,
  StyledTableBody,
  StyledTableHeading,
  StyledCellText,
  Menu,
  StyledHeaderCell,
  StyledIconButton,
  StyledTableContainer,
  StyledTable,
} from './clusterTable.styled';

import useToggle from '@/hooks/useToggle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CLOUD_LOGO_OPTIONS: Record<InstallationType, any> = {
  [InstallationType.LOCAL]: k3dLogo,
  [InstallationType.AWS]: awsLogo,
  [InstallationType.CIVO]: civoLogo,
  [InstallationType.DIGITAL_OCEAN]: digitalOceanLogo,
  [InstallationType.VULTR]: vultrLogo,
  [InstallationType.GOOGLE]: googleCloudLogo,
};

const FORMATTED_CLUSTER_TYPE: Record<ClusterType, { nameLabel: string; typeLabel: string }> = {
  [ClusterType.MANAGEMENT]: { nameLabel: 'management', typeLabel: 'Physical' },
  [ClusterType.WORKLOAD]: { nameLabel: 'worker', typeLabel: 'Physical' },
  [ClusterType.WORKLOAD_V_CLUSTER]: { nameLabel: 'worker', typeLabel: 'Virtual' },
};

type ClusterRowProps = {
  cluster: Cluster | DraftCluster;
  expanded?: boolean;
  showExpandButton?: boolean;
  onExpanseClick?: () => void;
  onDeleteCluster: (clusterId: string) => void;
};

const ClusterRow: FunctionComponent<ClusterRowProps> = ({
  cluster,
  expanded,
  showExpandButton,
  onExpanseClick = noop,
  onDeleteCluster,
}) => {
  const { isOpen, close, toggle } = useToggle();

  const {
    clusterId,
    clusterName,
    type,
    cloudProvider,
    cloudRegion,
    creationDate,
    gitAuth: { gitUser } = {},
    status,
    nodeCount,
    environment,
  } = cluster;

  const cloudLogoSrc = CLOUD_LOGO_OPTIONS[cloudProvider ?? InstallationType.LOCAL];
  const { iconLabel, iconType, bgColor } = CLUSTER_TAG_CONFIG[status ?? ClusterStatus.PROVISIONED];
  const { nameLabel, typeLabel } = FORMATTED_CLUSTER_TYPE[type ?? ClusterType.MANAGEMENT];

  return (
    <>
      <StyledTableRow selected={isOpen}>
        <StyledTableCell align="right" style={{ width: '50px' }} selected={isOpen}>
          {type === ClusterType.MANAGEMENT && showExpandButton && (
            <StyledIconButton
              aria-label="expand row"
              size="small"
              onClick={onExpanseClick}
              expanded={expanded}
            >
              <KeyboardArrowDownIcon />
            </StyledIconButton>
          )}
        </StyledTableCell>
        <StyledTableCell scope="row" selected={isOpen}>
          <StyledCellText variant="body2" style={{ fontWeight: 500 }}>
            {clusterName}
          </StyledCellText>
          <StyledCellText variant="body2" style={{ color: DODGER_BLUE }}>
            {nameLabel}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell selected={isOpen}>
          <StyledCellText variant="body2">{typeLabel}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell selected={isOpen}>
          <StyledCellText variant="body2">
            {environment && <Tag text={environment.name ?? ''} bgColor={environment.color} />}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="left" selected={isOpen}>
          <Image src={cloudLogoSrc} height={18} width={30} alt={cloudProvider ?? ''} />
        </StyledTableCell>
        <StyledTableCell selected={isOpen}>
          <StyledCellText variant="body2">{cloudRegion}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="center" selected={isOpen}>
          {type !== ClusterType.WORKLOAD_V_CLUSTER && (
            <StyledCellText variant="body2">{nodeCount}</StyledCellText>
          )}
        </StyledTableCell>
        <StyledTableCell selected={isOpen}>
          {creationDate && (
            <StyledCellText variant="body2">
              {moment(+creationDate).format('DD MMM YYYY')}
            </StyledCellText>
          )}
        </StyledTableCell>
        <StyledTableCell selected={isOpen}>
          <StyledCellText variant="body2">{gitUser}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell selected={isOpen}>
          <StyledTag
            text={iconLabel}
            bgColor={bgColor}
            icon={iconType}
            spinImage={status === ClusterStatus.PROVISIONING}
          />
        </StyledTableCell>
        <StyledTableCell style={{ position: 'relative' }} selected={isOpen}>
          <IconButton
            aria-label="more info"
            onClick={toggle}
            disabled={status === ClusterStatus.DELETED}
          >
            <MoreHorizIcon />
          </IconButton>
          {isOpen && (
            <ClickAwayListener onClickAway={close}>
              <Menu>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => onDeleteCluster(clusterId)}>
                      <Typography variant="body2" style={{ color: `${FIRE_BRICK}` }}>
                        Delete cluster
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Menu>
            </ClickAwayListener>
          )}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

type NestedKeyOfCluster = NestedKeyOf<Cluster>;

type HeadCell = {
  id: NestedKeyOfCluster;
  label: string;
};

const headCells: HeadCell[] = [
  {
    id: 'clusterName',
    label: 'Name',
  },
  {
    id: 'type',
    label: 'Type',
  },
  {
    id: 'environment',
    label: 'Environment',
  },
  {
    id: 'cloudProvider',
    label: 'Cloud',
  },
  {
    id: 'cloudRegion',
    label: 'Region',
  },
  {
    id: 'nodeCount',
    label: 'Nodes',
  },
  {
    id: 'creationDate',
    label: 'Created',
  },
  {
    id: 'gitAuth.gitOwner',
    label: 'Created by',
  },
  {
    id: 'status',
    label: 'Status',
  },
];
type Order = 'asc' | 'desc';
interface ClusterTableHeadProps {
  orderBy: NestedKeyOfCluster;
  order: Order;
  onSort: (orderBy: NestedKeyOfCluster) => void;
}

const ClusterTableHead: FunctionComponent<ClusterTableHeadProps> = ({ orderBy, order, onSort }) => {
  return (
    <TableHead>
      <StyledTableRow>
        <StyledHeaderCell />
        {headCells.map((cell) => (
          <StyledHeaderCell key={cell.id}>
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={() => onSort(cell.id)}
            >
              <StyledTableHeading variant="labelMedium">{cell.label}</StyledTableHeading>
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};

interface ClusterTableProps extends Omit<ComponentPropsWithRef<'tbody'>, 'key'> {
  managementCluster: ManagementCluster;
  clusters: ClusterCache;
  onDeleteCluster: (clusterId: string) => void;
  customRef?: React.Ref<HTMLTableSectionElement>;
}

export const ClusterTable: FunctionComponent<ClusterTableProps> = ({
  managementCluster,
  clusters,
  onDeleteCluster,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(true);
  const [orderBy, setOrderBy] = useState<NestedKeyOfCluster>('clusterName');
  const [order, setOrder] = useState<Order>('asc');

  const handleRequestSort = (property: NestedKeyOfCluster) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredWorkloadClusters = useMemo(() => {
    return Object.values(clusters)
      .filter(
        (cluster) =>
          cluster.status !== ClusterStatus.DELETED && cluster.type !== ClusterType.MANAGEMENT,
      )
      .sort((a, b) =>
        order === 'asc'
          ? -descendingComparator(a, b, orderBy)
          : descendingComparator(a, b, orderBy),
      );
  }, [clusters, order, orderBy]);

  return (
    <StyledTableContainer {...rest}>
      <StyledTable aria-label="collapsible table">
        <ClusterTableHead onSort={handleRequestSort} order={order} orderBy={orderBy} />
        <StyledTableBody>
          <ClusterRow
            cluster={managementCluster}
            onDeleteCluster={onDeleteCluster}
            expanded={expanded}
            showExpandButton={!!filteredWorkloadClusters.length}
            onExpanseClick={() => setExpanded(!expanded)}
          />

          {expanded &&
            filteredWorkloadClusters.map((cluster) => (
              <ClusterRow
                key={cluster.clusterName}
                cluster={cluster}
                onDeleteCluster={onDeleteCluster}
              />
            ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

const ClusterTableWithRef = React.forwardRef<HTMLTableSectionElement, ClusterTableProps>(
  (props, ref) => <ClusterTable customRef={ref} {...props} />,
);

export default ClusterTableWithRef;
