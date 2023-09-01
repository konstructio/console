import React, {
  useState,
  FunctionComponent,
  ComponentPropsWithoutRef,
  useCallback,
  useRef,
} from 'react';
import TableHead from '@mui/material/TableHead';
import { IconButton, List, ListItem, ListItemButton } from '@mui/material';
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
import { ManagementCluster, ClusterStatus, ClusterType, Cluster } from '../../types/provision';
import { InstallationType } from '../../types/redux';
import Typography from '../../components/typography';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { noop } from '../../utils/noop';

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

type ClusterRowProps = Cluster & {
  expanded?: boolean;
  onExpanseClick?: () => void;
  onMenuOpenClose: (presentedCluster?: Cluster) => void;
  onDeleteCluster: () => void;
};

const ClusterRow: FunctionComponent<ClusterRowProps> = ({
  expanded,
  onExpanseClick = noop,
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
    gitAuth: { gitUser } = {},
    status,
    nodeCount,
  } = rest;

  const [menuOpen, setMenuOpen] = useState(false);

  const cloudLogoSrc = CLOUD_LOGO_OPTIONS[cloudProvider ?? InstallationType.LOCAL];
  const { iconLabel, iconType, bgColor } = CLUSTER_TAG_CONFIG[status ?? ClusterType.DRAFT];
  const formattedClusterType = type === ClusterType.MANAGEMENT ? 'management' : 'worker';

  const handleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
    onMenuOpenClose(!menuOpen ? rest : undefined);
  }, [menuOpen, onMenuOpenClose, rest]);

  const buttonRef = useRef(null);

  useOnClickOutside(buttonRef, () => setMenuOpen(false));

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="right" style={{ width: '50px' }}>
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
        <StyledTableCell component="th" scope="row">
          <StyledCellText variant="body2" style={{ fontWeight: 500 }}>
            {clusterName}
          </StyledCellText>
          <StyledCellText variant="body2" style={{ color: DODGER_BLUE }}>
            {formattedClusterType}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="left">
          <Image src={cloudLogoSrc} height={18} width={30} alt={cloudProvider ?? ''} />
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">{cloudRegion}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="right">
          <StyledCellText variant="body2">{nodeCount}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">
            {moment(+creationDate).format('DD MMM YYYY')}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">{gitUser}</StyledCellText>
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
    </>
  );
};

interface ClusterTableProps extends ComponentPropsWithoutRef<'div'> {
  managementCluster: ManagementCluster;
  onDeleteCluster: () => void;
  onMenuOpenClose: (presentedCluster?: Cluster) => void;
}

export const ClusterTable: FunctionComponent<ClusterTableProps> = ({
  managementCluster,
  onDeleteCluster,
  onMenuOpenClose,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(true);
  const { workloadClusters, domainName, gitProvider, cloudProvider, adminEmail } =
    managementCluster;

  return (
    <StyledTableContainer {...rest}>
      <StyledTable aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledHeaderCell />
            <StyledHeaderCell>
              <StyledTableHeading variant="labelMedium">Name</StyledTableHeading>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <StyledTableHeading variant="labelMedium">Cloud</StyledTableHeading>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <StyledTableHeading variant="labelMedium">Region</StyledTableHeading>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <StyledTableHeading variant="labelMedium">Nodes</StyledTableHeading>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <StyledTableHeading variant="labelMedium">Created</StyledTableHeading>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <StyledTableHeading variant="labelMedium">Created by</StyledTableHeading>
            </StyledHeaderCell>
            <StyledHeaderCell>
              <StyledTableHeading variant="labelMedium">Status</StyledTableHeading>
            </StyledHeaderCell>
            <StyledHeaderCell />
          </StyledTableRow>
        </TableHead>
        <StyledTableBody>
          <ClusterRow
            {...{
              ...managementCluster,
              gitOwner: managementCluster.gitAuth.gitOwner,
              nodeCount: undefined,
            }}
            onDeleteCluster={onDeleteCluster}
            onMenuOpenClose={onMenuOpenClose}
            expanded={expanded}
            onExpanseClick={() => setExpanded(!expanded)}
          />

          {expanded &&
            workloadClusters.map((cluster) => (
              <ClusterRow
                key={cluster.clusterName}
                {...cluster}
                onDeleteCluster={onDeleteCluster}
                onMenuOpenClose={onMenuOpenClose}
                domainName={domainName}
                gitProvider={gitProvider}
                cloudProvider={cloudProvider}
                adminEmail={adminEmail}
              />
            ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
