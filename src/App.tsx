import React, { FunctionComponent } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from './components/sidebar';
import Home from './containers/home';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  display: flex;
  height: 100%;
`;

const App: FunctionComponent = () => {
  const navigate = useNavigate();
  const onSidebarItemClick = ({ link }: { link: string }) => {
    navigate(link);
  };

  return (
    <Layout>
      <Sidebar onSidebarItemClick={onSidebarItemClick} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
