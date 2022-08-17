class ProductBarcodesExists {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Product not found.';
    this.statusCode = 404;
  }
}

export default ProductBarcodesExists;
