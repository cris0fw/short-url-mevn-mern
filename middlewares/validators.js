import axios from "axios";
import { body, param } from "express-validator";

const registerValidation = [
  body("username", "username es requerido")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Username es requerido"),
  body("email", "formato de email incorrecto")
    .isEmail()
    .notEmpty()
    .normalizeEmail()
    .withMessage("El email es invalido"),
  body("password", "La contraseña debe contener minimo 6 caracteres")
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage("La contraseña debe contener minimo 6 caracteres")
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinnciden las contraseñas");
      }
      return value;
    }),
];

const loginValidation = [
  body("email", "Formato de link incorrecto")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email invalido"),
  body("password").notEmpty().withMessage("Contraseña es valida"),
];

const linkValidation = [body("longLink").trim().notEmpty()];

const paramLinkValidation = [
  param("id", "formato param incorrecto").trim().notEmpty().escape(),
];

export {
  registerValidation,
  loginValidation,
  linkValidation,
  paramLinkValidation,
};
