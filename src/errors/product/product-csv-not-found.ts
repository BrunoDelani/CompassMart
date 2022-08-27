class FileCSVNotFound {
  public readonly message: string;
  public readonly statusCode: number;

  constructor () {
    this.message = 'File .csv not found.';
    this.statusCode = 404;
  }
}

export default FileCSVNotFound;
