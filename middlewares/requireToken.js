import jwt from "jsonwebtoken";

const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("No Bearer");

    token = token.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = id;
    next();
  } catch (error) {
    const tokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es valido",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no valido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "Token invalido",
    };

    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};

export default requireToken;
