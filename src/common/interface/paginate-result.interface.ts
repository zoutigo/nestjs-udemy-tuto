export class PaginatedResultInterface {
  data: any[];
  meta: { total: number; page: number; lastPage: number };
}
