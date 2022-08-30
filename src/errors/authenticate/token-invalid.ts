class InvalidToken {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Invalid token.';
    this.statusCode = 401;
  }
}

export default new InvalidToken();
