export interface ListFilterOptions<SortableEntityFields extends string = ''> {
  sort?: SortableEntityFields;
  order?: 1 | -1;
  offset?: number;
  limit?: number;
}

export interface ListDateFilterOptions {
  from?: Date;
  to?: Date;
}
