import { FormEvent } from 'react';

type RepoDataProps = {
  onSearchSumbit: (value: string) => void;
};

function SearchBar({ onSearchSumbit }: RepoDataProps) {
  function handleSearchBar(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = event.target;
    const formData = new FormData(data);

    const searchtext = formData.get('search');

    onSearchSumbit(searchtext);
  }

  return (
    <div>
      <form method="post" onSubmit={handleSearchBar}>
        <input type="text" placeholder="Rechercher" name="search" />
      </form>
    </div>
  );
}
export default SearchBar;
