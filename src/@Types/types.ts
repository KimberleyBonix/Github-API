export type Repository = {
  name: string;
  description: string;
  id: number;
  html_url: string;
  watchers: number;
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
};

export type QueryParams = {
  q: string | FormDataEntryValue | null;
  sort: string;
  order: string;
  per_page: number | FormDataEntryValue | null;
};
