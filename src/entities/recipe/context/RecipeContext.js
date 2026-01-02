import { createContext } from 'react';

// GlobalContext lives in its own file to satisfy fast-refresh rule (only components in provider file)
export const GlobalContext = createContext(null);

export default GlobalContext;
