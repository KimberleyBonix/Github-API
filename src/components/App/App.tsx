/* eslint-disable react/jsx-no-bind */
// React import
import { useState, useEffect, MouseEvent } from 'react';

// Package imports
import axios from 'axios';
import { Pagination } from 'semantic-ui-react';

// Types
import { Repository, QueryParams } from '../../@Types/types';

// Component import
import SearchBar from '../SearchBar/SearchBar';
import ReposResults from '../ReposResults/ReposResults';
import Message from '../Message/Message';

// SCSS
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [repoData, setRepoData] = useState<Repository[]>([]);
  const [totalResult, setTotalResult] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useState<QueryParams>({
    q: 'javascript',
    sort: '',
    order: '',
    per_page: 6,
  });

  useEffect(() => {
    axios
      .get('http://api.github.com/search/repositories', {
        params: {
          ...searchParams,
          page: currentPage,
        },
      })
      .then((response) => {
        setRepoData(response.data.items);
        setTotalResult(response.data.total_count);
      });
  }, [searchParams, currentPage]);

  const totalPages = Math.ceil(totalResult / searchParams.per_page);

  function handlePaginationChange(
    event: MouseEvent,
    { activePage }: { activePage: number }
  ) {
    setCurrentPage(activePage);
  }

  return (
    <main>
      <h1>Browse through repositories</h1>
      <SearchBar defaultValue={searchParams} onSearchSumbit={setSearchParams} />
      <Message result={totalResult} />
      <ReposResults repositories={repoData} />
      <Pagination
        defaultActivePage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePaginationChange}
      />
    </main>
  );
}

export default App;
