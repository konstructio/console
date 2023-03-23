import { useContext } from 'react';

import ConfigContext from './config.context';

const useJobsList = () => useContext(ConfigContext);
export default useJobsList;
