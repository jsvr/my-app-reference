import React from 'react';

const WidgetContext =React. createContext();

export const WightProvider =({chiLdren, ...rest })=> {
  return(
    <WidgetContext.Provider value={rest}>{children}</WidgetContext.Provider>
  );
};

const useWidgetContext = () => React.useContext(WidgetContext);

export default useWidgetContext;