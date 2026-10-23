class ApiError extends Error {
  constructor(
    statusCode,
    message = "Somthing wents wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.succes = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  //capturestacktrace use for make error history and show the error in console
  //The stack trace is useful for debugging because it shows the sequence of function calls that led to the error, allowing developers to trace back to the source of the problem.
  //api error class is used to create custom error objects that can be thrown and caught in the application, allowing for more specific error handling and better error reporting.
  // message property is used to store a human-readable error message that can be displayed to the user or logged for debugging purposes.
}
export { ApiError };
