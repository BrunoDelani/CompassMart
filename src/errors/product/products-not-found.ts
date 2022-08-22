class ProductsNotFound {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Not products found.';
    this.statusCode = 404;
  }
}

export default ProductsNotFound;
