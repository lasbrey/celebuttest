export interface PaginatedQuery {
  cursor?: string;
  direction?: string;
  filter?: string;
  limit?: number;
  math?: string;
  page?: number;
  range?: string;
  select?: string[];
  sort?: string;
}
