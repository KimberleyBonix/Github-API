// React import
import { useState, useEffect } from 'react';

// Package imports
import axios from 'axios';
import { Pagination } from 'semantic-ui-react';

// Types
import { Repository } from '../../@Types/Repository';

// Component import
import SearchBar from '../SearchBar/SearchBar';
import ReposResults from '../ReposResults/ReposResults';
import Message from '../Message/Message';

// SCSS
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const defaultValue = {
    q: 'javascript',
    per_page: 6,
  };
  const [repoData, setRepoData] = useState<Repository[]>([]);
  const [totalResult, setTotalResult] = useState(repoData.length);
  const [activePage, setActivePage] = useState(1);

  const [searchParams, setSearchParams] = useState(defaultValue);

  useEffect(() => {
    axios
      .get('http://api.github.com/search/repositories', {
        params: {
          ...searchParams,
          page: activePage,
        },
      })
      .then((response) => {
        // console.log(response.request.responseURL);
        setRepoData(response.data.items);
        setTotalResult(response.data.total_count);
      });
  }, [searchParams, activePage]);

  const totalPages = Math.ceil(totalResult / searchParams.per_page);

  function handlePaginationChange(
    event: MouseEvent<HTMLAnchorElement, MouseEvent>,
    { activePage }
  ) {
    setActivePage(activePage);
  }

  return (
    <main>
      <h1>Browse through repositories</h1>
      <SearchBar defaultValue={searchParams} onSearchSumbit={setSearchParams} />
      <Message result={totalResult} />
      <ReposResults repositories={repoData} />
      <Pagination
        defaultActivePage={activePage}
        totalPages={totalPages}
        onPageChange={handlePaginationChange}
      />
    </main>
  );
}

export default App;
