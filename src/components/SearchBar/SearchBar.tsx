import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  Input,
  Select,
} from 'semantic-ui-react';
import { QueryParams } from '../../@Types/types';

import './SearchBar.scss';

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
    <Form method="post" onSubmit={handleSearchBar} className="form">
      <FormGroup>
        <FormInput
          className="query-input"
          label="Search a repository name"
          name="q"
          placeholder="Search..."
          defaultValue={defaultValue.q}
        />
        <FormSelect
          className="select-input"
          label="Sort by"
          name="sort"
          placeholder="Sort by"
          options={sortOptions}
          onChange={handleSortValue}
        />
        <FormSelect
          className="select-input"
          label="Order"
          name="order"
          placeholder="Order"
          options={orderOptions}
          onChange={handleOrderValue}
        />
        <FormInput
          className="perpage"
          label="Result by page"
          name="per_page"
          type="number"
          defaultValue={defaultValue.per_page}
        />
        <Button type="submit">Rechercher</Button>
      </FormGroup>
    </Form>
  );
}
export default SearchBar;
