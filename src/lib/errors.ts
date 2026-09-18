export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code = "API_ERROR"
  ) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found") {
    super(404, message, "NOT_FOUND");
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request") {
    super(400, message, "BAD_REQUEST");
  }
}
