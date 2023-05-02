import React, { useState, FunctionComponent, PropsWithChildren } from 'react';

import ConfigContext from './config.context';

const ConfigProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [configs, setConfigs] = useState({});
  const [flags, setFlags] = useState({});

  return (
    <ConfigContext.Provider value={{ configs, setConfigs, flags, setFlags }}>
      {children}
    </ConfigContext.Provider>
  );
};
export default ConfigProvider;
