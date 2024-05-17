import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const expiresIn = 60 * 15;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export { generateToken };
