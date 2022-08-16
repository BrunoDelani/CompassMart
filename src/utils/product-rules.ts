class ProductRules {
  public readonly minPrice: number;
  public readonly maxPrice: number;
  public readonly minStockToRegister: number;
  public readonly maxStock: number;
  public readonly barCodesLength: number;

  constructor () {
    this.minPrice = 0.01;
    this.maxPrice = 1000;
    this.minStockToRegister = 1;
    this.maxStock = 100000;
    this.barCodesLength = 13;
  }
}

export default new ProductRules();
