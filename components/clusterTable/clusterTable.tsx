import React, {
  useState,
  FunctionComponent,
  ComponentPropsWithoutRef,
  useCallback,
  useRef,
} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Box, Collapse, IconButton, List, ListItem, ListItemButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'next/image';
import moment from 'moment';

import k3dLogo from '../../assets/k3d_logo.svg';
import awsLogo from '../../assets/aws_logo.svg';
import civoLogo from '../../assets/civo_logo.svg';
import digitalOceanLogo from '../../assets/digital_ocean_logo.svg';
import vultrLogo from '../../assets/vultr_logo.svg';
import { CLUSTER_TAG_CONFIG } from '../../constants';
import { DODGER_BLUE, FIRE_BRICK, ROCK_BLUE } from '../../constants/colors';
import { Cluster, ClusterStatus, ClusterType } from '../../types/provision';
import { InstallationType } from '../../types/redux';
import Typography from '../../components/typography';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import {
  StyledTableRow,
  StyledTableCell,
  StyledTag,
  StyledTableBody,
  StyledIconButton,
  StyledTableHeading,
  StyledCellText,
  Menu,
} from './clusterTable.styled';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CLOUD_LOGO_OPTIONS: Record<InstallationType, any> = {
  [InstallationType.LOCAL]: k3dLogo,
  [InstallationType.AWS]: awsLogo,
  [InstallationType.CIVO]: civoLogo,
  [InstallationType.DIGITAL_OCEAN]: digitalOceanLogo,
  [InstallationType.VULTR]: vultrLogo,
};

export type ClusterInfo = Pick<
  Cluster,
  | 'clusterName'
  | 'type'
  | 'domainName'
  | 'gitProvider'
  | 'cloudProvider'
  | 'cloudRegion'
  | 'creationDate'
  | 'gitUser'
  | 'status'
  | 'adminEmail'
> & {
  nodes?: number;
  instanceSize?: string;
};

type ClusterRowProps = ClusterInfo & {
  onMenuOpenClose: (clusterName?: string) => void;
  onDeleteCluster: () => void;
};

const ClusterRow: FunctionComponent<ClusterRowProps> = ({
  onDeleteCluster,
  onMenuOpenClose,
  ...rest
}) => {
  const {
    clusterName,
    type,
    cloudProvider,
    cloudRegion,
    creationDate = '',
    gitUser: createdBy,
    status,
    nodes,
  } = rest;

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cloudLogoSrc = CLOUD_LOGO_OPTIONS[cloudProvider];
  const { iconLabel, iconType, bgColor } = CLUSTER_TAG_CONFIG[status ?? 'draft'];
  const formattedClusterType = type === ClusterType.MANAGEMENT ? 'management' : 'worker';

  // placeholder for now. new field yet to be implemented
  const nodeCount = nodes ?? 2;

  const handleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
    onMenuOpenClose(!menuOpen ? clusterName : undefined);
  }, [menuOpen, onMenuOpenClose, clusterName]);

  const buttonRef = useRef(null);

  useOnClickOutside(buttonRef, () => setMenuOpen(false));

  return (
    <>
      <StyledTableRow
        sx={{
          '&:hover td:first-child button': { opacity: 1, pointerEvents: 'all' },
        }}
      >
        <StyledTableCell align="right" style={{ width: '50px' }}>
          <StyledIconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUpIcon sx={{ color: ROCK_BLUE }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: ROCK_BLUE }} />
            )}
          </StyledIconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <StyledCellText variant="body2" style={{ fontWeight: 500 }}>
            {clusterName}
          </StyledCellText>
          <StyledCellText variant="body2" style={{ color: DODGER_BLUE }}>
            {formattedClusterType}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="left">
          <Image src={cloudLogoSrc} height={18} width={30} alt={cloudProvider} />
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">{cloudRegion}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="right">
          <StyledCellText variant="body2">{nodeCount}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">
            {moment(new Date(creationDate as string)).format('DD MMM YYYY')}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">{createdBy}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledTag text={iconLabel} bgColor={bgColor} icon={iconType} />
        </StyledTableCell>
        <StyledTableCell style={{ position: 'relative' }}>
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
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, height: '100px' }}>TBD</Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

interface ClusterTableProps extends ComponentPropsWithoutRef<'div'> {
  clusters: ClusterInfo[];
  onDeleteCluster: () => void;
  onMenuOpenClose: (clusterName?: string) => void;
}

export const ClusterTable: FunctionComponent<ClusterTableProps> = ({
  clusters,
  onDeleteCluster,
  onMenuOpenClose,
  ...rest
}) => (
  <TableContainer style={{ display: 'flex', height: '100%' }} {...rest}>
    <Table
      aria-label="collapsible table"
      sx={{ borderCollapse: 'collapse', margin: '5px', height: 'fit-content' }}
    >
      <TableHead>
        <StyledTableRow>
          <StyledTableCell />
          <StyledTableCell>
            <StyledTableHeading variant="labelMedium">Name</StyledTableHeading>
          </StyledTableCell>
          <StyledTableCell>
            <StyledTableHeading variant="labelMedium">Cloud</StyledTableHeading>
          </StyledTableCell>
          <StyledTableCell>
            <StyledTableHeading variant="labelMedium">Region</StyledTableHeading>
          </StyledTableCell>
          <StyledTableCell>
            <StyledTableHeading variant="labelMedium">Nodes</StyledTableHeading>
          </StyledTableCell>
          <StyledTableCell>
            <StyledTableHeading variant="labelMedium">Created</StyledTableHeading>
          </StyledTableCell>
          <StyledTableCell>
            <StyledTableHeading variant="labelMedium">Created by</StyledTableHeading>
          </StyledTableCell>
          <StyledTableCell>
            <StyledTableHeading variant="labelMedium">Status</StyledTableHeading>
          </StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <StyledTableBody>
        {clusters.map((cluster) => (
          <ClusterRow
            key={cluster.clusterName}
            {...cluster}
            onDeleteCluster={onDeleteCluster}
            onMenuOpenClose={onMenuOpenClose}
          />
        ))}
      </StyledTableBody>
    </Table>
  </TableContainer>
);
