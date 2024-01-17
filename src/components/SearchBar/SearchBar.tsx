import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Input, Select } from 'semantic-ui-react';
import { QueryParams } from '../../@Types/types';

type SearchBarProps = {
  onSearchSumbit: Dispatch<SetStateAction<QueryParams>>;
  defaultValue: QueryParams;
};

function SearchBar({ onSearchSumbit, defaultValue }: SearchBarProps) {
  const [sortValue, setSortValue] = useState('');
  const [orderValue, setOrderValue] = useState('');

  const orderOptions = [
    { key: 'asc', value: 'asc', text: 'Ascendant' },
    { key: 'desc', value: 'desc', text: 'Descendant' },
  ];

  const sortOptions = [
    { key: 'stars', value: 'stars', text: 'Stars' },
    { key: 'forks', value: 'forks', text: 'Forks' },
    { key: 'help', value: 'help-wanted-issues', text: 'Help wanted issues' },
    { key: 'updated', value: 'updated', text: 'Updated' },
  ];

  const handleSortValue = (event, { value }) => setSortValue(value);
  const handleOrderValue = (event, { value }) => setOrderValue(value);

  function handleSearchBar(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const params = {
      sort: sortValue,
      order: orderValue,
    };

    const data = event.target;
    const formData = new FormData(data);
    formData.forEach((value, key) => (params[key] = value));

    onSearchSumbit(params);
  }

  return (
    <div>
      <form method="post" onSubmit={handleSearchBar}>
        <Input name="q" placeholder="Search..." defaultValue={defaultValue.q} />
        <Select
          name="sort"
          placeholder="Sort by"
          options={sortOptions}
          onChange={handleSortValue}
        />
        <Select
          name="order"
          placeholder="Order by"
          options={orderOptions}
          onChange={handleOrderValue}
        />
        <Input
          name="per_page"
          type="number"
          defaultValue={defaultValue.per_page}
        />
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
}
export default SearchBar;
