class ProductIdInvalid {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Product Id is invalid.';
    this.statusCode = 400;
  }
}

export default ProductIdInvalid;
