export type Repository = {
  name: string;
  description: string;
  id: number;
};

export type QueryParams = {
  q: string;
  sort: string;
  order: string;
  per_page: number;
};
