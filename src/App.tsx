import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './containers/home';

const App: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
