import jwt from "jsonwebtoken";

const requireRefreshToken = async (req, res, next) => {
  try {
    // Obteniendo el refreshToken en las cookies
    const refreshTokenCookie = req.cookies.refreshToken;

    // Si no esta el refreshToken entonces mandame error
    if (!refreshTokenCookie) throw new Error("No Bearer");

    // Aca esta verificando mi token
    const { id } = jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN);

    // tine la informacion del usuario el ID
    req.id = id;

    next();
  } catch (error) {
    console.log(error);
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

export default requireRefreshToken;
