import React, { FunctionComponent, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getConfigs } from './actions/config.action';
import Sidebar from './components/sidebar';
import Home from './containers/home';
import { useAppDispatch } from './hooks';
import Footer from './containers/footer';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  display: flex;
  height: 100%;
`;

const App: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSidebarItemClick = ({ link }: { link: string }) => {
    navigate(link);
  };

  useEffect(() => {
    const getConfigValues = async () => await dispatch(getConfigs()).unwrap();

    getConfigValues();
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Sidebar onSidebarItemClick={onSidebarItemClick} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  );
};

export default App;
