import { validationResult } from "express-validator";

export const validateResults = (req, res, next) => {
  //viendo el resultado de error de express-validator

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
  }

  next();
};
