class PaginateCustomLabels {
  public readonly docs: string;
  public readonly totalDocs: string;
  public readonly limit: string;
  public readonly page: string;
  public readonly totalPages: string;
  public readonly pagingCounter: boolean;
  public readonly hasPrevPage: boolean;
  public readonly hasNextPage: boolean;
  public readonly prevPage: boolean;
  public readonly nextPage: boolean;

  constructor () {
    this.docs = 'products';
    this.totalDocs = 'total';
    this.limit = 'limit';
    this.page = 'offset';
    this.totalPages = 'offsets';
    this.pagingCounter = false;
    this.hasPrevPage = false;
    this.hasNextPage = false;
    this.prevPage = false;
    this.nextPage = false;
  }
}

export default new PaginateCustomLabels();
