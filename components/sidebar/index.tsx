import React, { FunctionComponent } from 'react';
import { IoHomeOutline } from 'react-icons/io5';

import { Container, Divider, Icon, Row, SidebarItems } from './sidebar.styled';

type SidebarItem = {
  name: string;
  link: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};

const SIDEBAR_FOOTER_ITEMS: Array<SidebarItem> = [];

const SIDEBAR_ITEMS: Array<SidebarItem> = [
  {
    name: 'home',
    link: '/',
    icon: IoHomeOutline,
  },
];

export interface ISidebarProps {
  onSidebarItemClick: (item: SidebarItem) => void;
}

const Sidebar: FunctionComponent<ISidebarProps> = ({ onSidebarItemClick }) => {
  const buildSidebarItems = (items: Array<SidebarItem>) => {
    return items.map((item) => (
      <Row isActive shouldShowHoverState onClick={() => onSidebarItemClick(item)} key={item.name}>
        {React.createElement(item.icon)}
      </Row>
    ));
  };

  return (
    <Container data-testid="sidebar-component">
      <Row data-testid="home-item" onClick={() => onSidebarItemClick({ name: 'home', link: '/' })}>
        <Icon alt="k-ray" />
      </Row>
      <Divider />
      <SidebarItems data-testid="sidebar-items">
        <div>{buildSidebarItems(SIDEBAR_ITEMS)}</div>
        <div>{buildSidebarItems(SIDEBAR_FOOTER_ITEMS)}</div>
      </SidebarItems>
    </Container>
  );
};

export default Sidebar;
