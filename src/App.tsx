import React, { FunctionComponent, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getConfigs } from './actions/config.action';
import Sidebar from './components/sidebar';
import Home from './containers/home';
import { useAppDispatch } from './hooks';
import Wave from './assets/wave.svg';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.bleachedSilk};
  display: flex;
  height: 100%;
`;

const Background = styled.img.attrs({ src: Wave })`
  position: absolute;
  bottom: 0;
  left: 106px;
  width: calc(100% - 106px);
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
    <Layout>
      <Sidebar onSidebarItemClick={onSidebarItemClick} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Background />
    </Layout>
  );
};

export default App;
