class ProductPageNotFound {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Page not found.';
    this.statusCode = 404;
  }
}

export default ProductPageNotFound;
