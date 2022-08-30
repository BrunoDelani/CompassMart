class NoToken {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'No token provided.';
    this.statusCode = 401;
  }
}

export default new NoToken();
