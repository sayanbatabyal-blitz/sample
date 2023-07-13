export class HandledError extends Error {
    public status: Number;
    public problem:string
    constructor(message: string, problem:string, status?: Number) {
      // Calling parent constructor of base Error class.
      super(message);
  
      // Saving class name in the property of our custom error as a shortcut.
      this.name = this.constructor.name;
      this.problem= problem
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor);
  
      // You can use any additional properties you want.
      // I'm going to use preferred HTTP status for this error types.
      // `500` is the default value if not specified.
      this.status = status || 500;
    }
  }
  