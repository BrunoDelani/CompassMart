class ProductBarcodesExists {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'This bar_codes is already in use.';
    this.statusCode = 400;
  }
}

export default ProductBarcodesExists;
