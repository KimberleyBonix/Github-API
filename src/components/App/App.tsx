/* eslint-disable react/jsx-no-bind */
// React import
import { useState, useEffect, MouseEvent } from 'react';

// Package imports
import axios from 'axios';
import { Icon, Pagination } from 'semantic-ui-react';

// Types
import { Repository, QueryParams } from '../../@Types/types';

// Component import
import SearchBar from '../SearchBar/SearchBar';
import ReposResults from '../ReposResults/ReposResults';
import ResultMessage from '../Message/Message';

// SCSS
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

function App() {
  const [repoData, setRepoData] = useState<Repository[]>([]);
  const [totalResult, setTotalResult] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useState<QueryParams>({
    q: 'Javascript',
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
      <h1>
        <Icon name="github" />
        Browse Github repositories
      </h1>
      <SearchBar defaultValue={searchParams} onSearchSumbit={setSearchParams} />
      <ResultMessage result={totalResult} />
      <ReposResults repositories={repoData} />

      <div className="pagination">
        <Pagination
          defaultActivePage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePaginationChange}
        />
      </div>
    </main>
  );
}

export default App;
