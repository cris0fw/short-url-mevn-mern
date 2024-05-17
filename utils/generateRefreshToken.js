import jwt from "jsonwebtoken";

const generateRefreshToken = (id, res) => {
  //   dura aproxidamente 30 dias
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN, {
      expiresIn,
    });

    // GUARDAMOS EL REFRESH TOKEN EN UNA COOKIE
    //Esto automaticamente se manda a las cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

export { generateRefreshToken };
