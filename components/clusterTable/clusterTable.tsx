import React, {
  useState,
  FunctionComponent,
  ComponentPropsWithoutRef,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import TableHead from '@mui/material/TableHead';
import { IconButton, List, ListItem, ListItemButton } from '@mui/material';
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
import { CLUSTER_TAG_CONFIG } from '../../constants';
import { DODGER_BLUE, FIRE_BRICK } from '../../constants/colors';
import {
  ManagementCluster,
  ClusterStatus,
  ClusterType,
  Cluster,
  WorkloadCluster,
} from '../../types/provision';
import { InstallationType } from '../../types/redux';
import Typography from '../../components/typography';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CLOUD_LOGO_OPTIONS: Record<InstallationType, any> = {
  [InstallationType.LOCAL]: k3dLogo,
  [InstallationType.AWS]: awsLogo,
  [InstallationType.CIVO]: civoLogo,
  [InstallationType.DIGITAL_OCEAN]: digitalOceanLogo,
  [InstallationType.VULTR]: vultrLogo,
};

const FORMATTED_CLUSTER_TYPE: Record<ClusterType, { nameLabel: string; typeLabel: string }> = {
  [ClusterType.MANAGEMENT]: { nameLabel: 'management', typeLabel: 'Physical' },
  [ClusterType.WORKLOAD]: { nameLabel: 'worker', typeLabel: 'Physical' },
  [ClusterType.WORKLOAD_V_CLUSTER]: { nameLabel: 'worker', typeLabel: 'Virtual' },
};

type ClusterRowProps = Cluster & {
  expanded?: boolean;
  onExpanseClick?: () => void;
  onMenuOpenClose: (presentedCluster?: Cluster) => void;
  onDeleteCluster: () => void;
  presentedClusterId?: string;
};

const ClusterRow: FunctionComponent<ClusterRowProps> = ({
  expanded,
  onExpanseClick = noop,
  onDeleteCluster,
  onMenuOpenClose,
  ...rest
}) => {
  const {
    id,
    clusterName,
    type,
    cloudProvider,
    cloudRegion,
    creationDate,
    gitAuth: { gitUser } = {},
    status,
    nodeCount,
    environment,
    presentedClusterId,
  } = rest;

  const [menuOpen, setMenuOpen] = useState(false);

  const cloudLogoSrc = CLOUD_LOGO_OPTIONS[cloudProvider ?? InstallationType.LOCAL];
  const { iconLabel, iconType, bgColor } = CLUSTER_TAG_CONFIG[status ?? ClusterStatus.PROVISIONED];
  const { nameLabel, typeLabel } = FORMATTED_CLUSTER_TYPE[type];

  const handleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
    onMenuOpenClose(!menuOpen ? rest : undefined);
  }, [menuOpen, onMenuOpenClose, rest]);

  const buttonRef = useRef(null);

  useOnClickOutside(buttonRef, () => setMenuOpen(false));

  const rowSelected = id === presentedClusterId;

  return (
    <>
      <StyledTableRow selected={rowSelected}>
        <StyledTableCell align="right" style={{ width: '50px' }} selected={rowSelected}>
          {type === ClusterType.MANAGEMENT && (
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
        <StyledTableCell scope="row" selected={rowSelected}>
          <StyledCellText variant="body2" style={{ fontWeight: 500 }}>
            {clusterName}
          </StyledCellText>
          <StyledCellText variant="body2" style={{ color: DODGER_BLUE }}>
            {nameLabel}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell selected={rowSelected}>
          <StyledCellText variant="body2">{typeLabel}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell selected={rowSelected}>
          <StyledCellText variant="body2">
            {environment && <Tag text={environment} bgColor="light-blue" />}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="left" selected={rowSelected}>
          <Image src={cloudLogoSrc} height={18} width={30} alt={cloudProvider ?? ''} />
        </StyledTableCell>
        <StyledTableCell selected={rowSelected}>
          <StyledCellText variant="body2">{cloudRegion}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="center" selected={rowSelected}>
          <StyledCellText variant="body2">{nodeCount}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell selected={rowSelected}>
          {creationDate && (
            <StyledCellText variant="body2">
              {moment(+creationDate).format('DD MMM YYYY')}
            </StyledCellText>
          )}
        </StyledTableCell>
        <StyledTableCell selected={rowSelected}>
          <StyledCellText variant="body2">{gitUser}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell selected={rowSelected}>
          <StyledTag text={iconLabel} bgColor={bgColor} icon={iconType} />
        </StyledTableCell>
        <StyledTableCell style={{ position: 'relative' }} selected={rowSelected}>
          <IconButton
            aria-label="more info"
            onClick={handleMenu}
            ref={buttonRef}
            disabled={status === ClusterStatus.DELETED}
          >
            <MoreHorizIcon />
          </IconButton>
          {menuOpen && (
            <Menu>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={onDeleteCluster}>
                    <Typography variant="body2" style={{ color: `${FIRE_BRICK}` }}>
                      Delete cluster
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            </Menu>
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
    label: 'Count',
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

interface ClusterTableProps extends ComponentPropsWithoutRef<'div'> {
  managementCluster: ManagementCluster;
  draftCluster?: WorkloadCluster;
  onDeleteCluster: () => void;
  onMenuOpenClose: (presentedCluster?: Cluster) => void;
  presentedClusterId?: string;
}

export const ClusterTable: FunctionComponent<ClusterTableProps> = ({
  managementCluster,
  draftCluster,
  onDeleteCluster,
  onMenuOpenClose,
  presentedClusterId,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(true);
  const [orderBy, setOrderBy] = useState<NestedKeyOfCluster>('clusterName');
  const [order, setOrder] = useState<Order>('asc');

  const { workloadClusters } = managementCluster;

  const handleRequestSort = (property: NestedKeyOfCluster) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredWorkloadClusters = useMemo(() => {
    const clustersCopy = [...workloadClusters];
    if (draftCluster) {
      clustersCopy.push(draftCluster);
    }

    return clustersCopy
      .filter((cluster) => cluster.status !== ClusterStatus.DELETED)
      .sort((a, b) =>
        order === 'asc'
          ? -descendingComparator(a, b, orderBy)
          : descendingComparator(a, b, orderBy),
      );
  }, [workloadClusters, draftCluster, order, orderBy]);

  return (
    <StyledTableContainer {...rest}>
      <StyledTable aria-label="collapsible table">
        <ClusterTableHead onSort={handleRequestSort} order={order} orderBy={orderBy} />
        <StyledTableBody>
          <ClusterRow
            {...managementCluster}
            onDeleteCluster={onDeleteCluster}
            onMenuOpenClose={onMenuOpenClose}
            expanded={expanded}
            onExpanseClick={() => setExpanded(!expanded)}
            presentedClusterId={presentedClusterId}
          />

          {expanded &&
            filteredWorkloadClusters.map((cluster) => (
              <ClusterRow
                key={cluster.clusterName}
                {...cluster}
                onDeleteCluster={onDeleteCluster}
                onMenuOpenClose={onMenuOpenClose}
                presentedClusterId={presentedClusterId}
              />
            ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
