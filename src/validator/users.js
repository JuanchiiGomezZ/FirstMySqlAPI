import { check } from "express-validator";
import { validationResult } from "express-validator";

export const validateSignUpCreate = [
  check("name").exists().not().isEmpty().isAlpha().trim(),
  check("lastname").exists().not().isEmpty().isAlpha().trim(),
  check("email").exists().not().isEmpty().isEmail().trim(),
  check("password").exists().not().isEmpty().isStrongPassword(),
  check("profilepic").exists().not().isEmpty().isURL(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];

export const validateLoginCreate = [
  check("email").exists().not().isEmpty().isEmail().escape().trim(),
  check("password").exists().not().isEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403);
      res.send({ errors: error.array() });
    }
  },
];
