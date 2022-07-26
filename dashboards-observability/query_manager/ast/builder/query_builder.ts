export interface QueryBuilder<T> {
  build: () => T;
}