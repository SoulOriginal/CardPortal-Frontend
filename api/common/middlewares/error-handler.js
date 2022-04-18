import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { BadRequestError } from "../errors/bad-request-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";
// @ts-ignore
export const errorHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    const error = err.serializeErrors()[0];
    return res.status(200).send({
      resultCode: err.resultCode,
      error,
    });
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ error: err.serializeErrors() });
  }
  if (err instanceof BadRequestError) {
    const error = err.serializeErrors();
    return res.status(200).send({
      resultCode: err.resultCode,
      error,
    });
  }
  if (err instanceof NotAuthorizedError) {
    const error = err.serializeErrors();
    return res.status(200).send({
      resultCode: err.resultCode,
      error,
    });
  }

  res.status(200).send({
    msg: err.message,
  });
};
