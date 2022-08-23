import React, { useEffect } from 'react';

import { useAppDispatch } from '../../hooks';
import { setUser } from '../../slices/user.slice';
import HomeComponent from '../../components/home';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser({ name: 'test', lastName: 'test' }));
  }, [dispatch]);

  return <HomeComponent />;
};

export default Home;
