class UserEmailExists {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'This email is already in use.';
    this.statusCode = 400;
  }
}

export default UserEmailExists;
