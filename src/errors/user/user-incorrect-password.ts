class UserIncorrectPassword {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'Incorrect password.';
    this.statusCode = 401;
  }
}

export default UserIncorrectPassword;
