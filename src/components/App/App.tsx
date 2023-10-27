// React import
import { useState, useEffect } from 'react';
import { Repository } from '../../@Types/Repository';

// Component import
import SearchBar from '../SearchBar/SearchBar';
import ReposResults from '../ReposResults/ReposResults';
import Message from '../Message/Message';

// SCSS
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

import rawData from '../../data/repos';

function App() {
  const [repoData, setRepoData] = useState<Repository[]>(rawData.items);
  const [searchValue, setSearchValue] = useState<string>('javascript');

  useEffect(() => {
    if (searchValue) {
      fetch(`http://api.github.com/search/repositories?q=${searchValue}`)
        .then((response) => response.json())
        .then((data) => {
          setRepoData(data.items);
        });
    } else {
      setSearchValue('javascript'); // reset
    }
  }, [searchValue]);

  return (
    <>
      <SearchBar onSearchSumbit={setSearchValue} />
      <Message result={repoData.length} />
      <ReposResults repositories={repoData} />;
    </>
  );
}

export default App;
