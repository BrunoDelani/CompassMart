class ProductBarcodesExists {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'No products found.';
    this.statusCode = 404;
  }
}

export default ProductBarcodesExists;
