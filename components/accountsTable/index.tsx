'use client';
import React, {
  useState,
  FunctionComponent,
  useMemo,
  ComponentPropsWithRef,
  ChangeEvent,
} from 'react';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

import { ECHO_BLUE } from '../../constants/colors';
import { descendingComparator } from '../../utils/descendingComparator';
import { Container } from '../textField/textField.styled';
import TextFieldWithRef from '../textField';
import Button from '../button';

import {
  StyledTableRow,
  StyledTableCell,
  StyledTableBody,
  StyledTableHeading,
  StyledCellText,
  StyledHeaderCell,
  StyledTableContainer,
  StyledTable,
  SearchHeader,
} from './accountsTable.styled';

import { CloudAccount } from '@/types/cloudAccount';

interface AccountRowProps {
  account: CloudAccount;
  handleEnableAccount: () => void;
}

const AccountRow: FunctionComponent<AccountRowProps> = ({ account, handleEnableAccount }) => {
  const { name, isEnabled } = account;

  return (
    <StyledTableRow>
      <StyledTableCell scope="row">
        <StyledCellText variant="body2" style={{ fontWeight: 500 }}>
          {name}
        </StyledCellText>
      </StyledTableCell>
      <StyledTableCell>{isEnabled}</StyledTableCell>
    </StyledTableRow>
  );
};

type AccountKey = keyof CloudAccount;

type HeadCell = {
  id: AccountKey;
  label: string;
};

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Account Name',
  },
  {
    id: 'isEnabled',
    label: 'State',
  },
];

type Order = 'asc' | 'desc';

interface AccountTableHeadProps {
  orderBy: AccountKey;
  order: Order;
  onSort: (orderBy: AccountKey) => void;
}

const AccountTableHead: FunctionComponent<AccountTableHeadProps> = ({ orderBy, order, onSort }) => {
  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((cell) => (
          <StyledHeaderCell key={cell.id}>
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={() => onSort(cell.id)}
              IconComponent={ArrowDropDownIcon}
              sx={{
                '.MuiTableSortLabel-icon': {
                  fill: ECHO_BLUE,
                },
              }}
            >
              <StyledTableHeading variant="labelMedium">{cell.label}</StyledTableHeading>
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
        <StyledHeaderCell />
      </StyledTableRow>
    </TableHead>
  );
};

interface AccountsTableProps extends Omit<ComponentPropsWithRef<'tbody'>, 'key'> {
  accounts: Array<CloudAccount>;
  handleEnableAccount: () => void;
  customRef?: React.Ref<HTMLTableSectionElement>;
}

export const AccountsTable: FunctionComponent<AccountsTableProps> = ({
  accounts,
  handleEnableAccount,
  customRef,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<AccountKey>('name');
  const [order, setOrder] = useState<Order>('asc');

  const handleRequestSort = (property: AccountKey) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOnChangeSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedAccounts = useMemo(() => {
    return Object.values(accounts)
      .filter(({ name }) => name.includes(searchTerm))
      .sort((a, b) =>
        order === 'asc'
          ? -descendingComparator(a, b, orderBy)
          : descendingComparator(a, b, orderBy),
      );
  }, [accounts, order, orderBy, searchTerm]);

  return (
    <StyledTableContainer>
      <SearchHeader>
        <Container>
          <TextFieldWithRef
            autoComplete="off"
            size="small"
            startAdornment={<SearchIcon />}
            onChange={handleOnChangeSearch}
          />
        </Container>
        <Button color="primary" variant="contained" sx={{ width: 'max-content ' }}>
          Add cloud account
        </Button>
      </SearchHeader>
      <StyledTable aria-label="collapsible table">
        <AccountTableHead onSort={handleRequestSort} order={order} orderBy={orderBy} />
        <StyledTableBody ref={customRef}>
          {sortedAccounts.map((account) => (
            <AccountRow
              key={account.name}
              account={account}
              handleEnableAccount={handleEnableAccount}
            />
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

const AccountsTableWithRef = React.forwardRef<HTMLTableSectionElement, AccountsTableProps>(
  (props, ref) => <AccountsTable customRef={ref} {...props} />,
);

export default AccountsTableWithRef;
