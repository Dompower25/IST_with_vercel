export interface IQueryBuilder<FILTER_TYPE> {
  key: keyof FILTER_TYPE
  filter: FILTER_TYPE[keyof FILTER_TYPE]
}
