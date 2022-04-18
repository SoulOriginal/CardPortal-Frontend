import { NotAuthorizedError } from "../errors/not-authorized-error";
// @ts-ignore
export const requireAuth = (req, res, next) => {
  const { getAllPoints } = req.query;
  if (!req.currentUser && !getAllPoints) {
    throw new NotAuthorizedError();
  }
  next();
};
