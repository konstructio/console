import React, { useState, FunctionComponent, ComponentPropsWithoutRef } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Box, Collapse, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'next/image';

import k3dLogo from '../../assets/k3d_logo.svg';
import awsLogo from '../../assets/aws_logo.svg';
import civoLogo from '../../assets/civo_logo.svg';
import digitalOceanLogo from '../../assets/digital_ocean_logo.svg';
import vultrLogo from '../../assets/vultr_logo.svg';
import { TAG_CONFIG } from '../../constants';
import { NodeStatus, NodeType } from '../../types';
import { DODGER_BLUE, ROCK_BLUE } from '../../constants/colors';

import {
  StyledTableRow,
  StyledTableCell,
  StyledTag,
  StyledTableBody,
  StyledIconButton,
  StyledTableHeading,
  StyledCellText,
} from './clusterTable.styled';

const CLOUD_OPTIONS = {
  k3d: k3dLogo,
  aws: awsLogo,
  civo: civoLogo,
  digitalOcean: digitalOceanLogo,
  vultr: vultrLogo,
};

export type ClusterInfo = {
  name: string;
  nodeType: NodeType;
  cloud: keyof typeof CLOUD_OPTIONS;
  region: string;
  nodes: number;
  created: string;
  createdBy: string;
  status: NodeStatus;
};

const ClusterRow: FunctionComponent<ClusterInfo> = ({
  name,
  nodeType,
  cloud,
  region,
  nodes,
  created,
  createdBy,
  status,
}) => {
  const [open, setOpen] = useState(false);

  const cloudLogoSrc = CLOUD_OPTIONS[cloud];
  const { iconLabel, iconType, bgColor } = TAG_CONFIG[status];

  return (
    <>
      <StyledTableRow
        sx={{ '&:hover td:first-child button': { opacity: 1, pointerEvents: 'all' } }}
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
            {name}
          </StyledCellText>
          <StyledCellText variant="body2" style={{ color: DODGER_BLUE }}>
            {nodeType}
          </StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="left">
          <Image src={cloudLogoSrc} height={18} width={30} alt={cloud} />
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">{region}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell align="right">
          <StyledCellText variant="body2">{nodes}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">{created}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledCellText variant="body2">{createdBy}</StyledCellText>
        </StyledTableCell>
        <StyledTableCell>
          <StyledTag text={iconLabel} bgColor={bgColor} icon={iconType} />
        </StyledTableCell>
        <StyledTableCell>
          <IconButton aria-label="more info">
            <MoreHorizIcon />
          </IconButton>
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
  rows: ClusterInfo[];
}

export const ClusterTable: FunctionComponent<ClusterTableProps> = ({ rows, ...rest }) => (
  <TableContainer style={{ padding: '2px' }} {...rest}>
    <Table aria-label="collapsible table" sx={{ borderCollapse: 'collapse' }}>
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
        {rows.map((row) => (
          <ClusterRow key={row.name} {...row} />
        ))}
      </StyledTableBody>
    </Table>
  </TableContainer>
);
