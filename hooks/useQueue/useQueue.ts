import { useContext } from 'react';

import QueuContext from './queue.context';

const useQueue = () => useContext(QueuContext);
export default useQueue;
