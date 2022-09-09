class UsersNotFound {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Not users found.';
    this.statusCode = 404;
  }
}

export default UsersNotFound;
