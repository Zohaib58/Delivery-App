import React, {useState} from 'react';

export const searchContext = React.createContext();

export const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('');

  const search = (props) => {
    setKeyword(props)
  };

  return (
    <searchContext.Provider value={{ keyword, search}}>
      {children}
    </searchContext.Provider>
  );
};
