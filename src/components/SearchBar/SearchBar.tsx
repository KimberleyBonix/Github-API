/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import {
  Button,
  DropdownProps,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
} from 'semantic-ui-react';
import { QueryParams } from '../../@Types/types';

import './SearchBar.scss';

type SearchBarProps = {
  onSearchSumbit: Dispatch<SetStateAction<QueryParams>>;
  defaultValue: QueryParams;
};
function SearchBar({ onSearchSumbit, defaultValue }: SearchBarProps) {
  const [sortValue, setSortValue] = useState<any>('');
  const [orderValue, setOrderValue] = useState<any>('');

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

  function handleSortValue(event: SyntheticEvent, { value }: DropdownProps) {
    setSortValue(value);
  }

  function handleOrderValue(event: SyntheticEvent, { value }: DropdownProps) {
    setOrderValue(value);
  }

  function handleSearchBar(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const data = event.currentTarget;
    const formData = new FormData(data);

    const params: QueryParams = {
      sort: sortValue,
      order: orderValue,
      per_page: formData.get('per_page'),
      q: formData.get('q'),
    };

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
