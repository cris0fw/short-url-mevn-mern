import UserModel from "../schemas/User.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });
    const userUsername = await UserModel.findOne({ username });

    if (userEmail) {
      return res.status(404).json({
        message: "El email ya es existente",
      });
    }

    if (userUsername) {
      return res.status(404).json({
        message: "El username ya ex existente",
      });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    return res.status(201).json({
      message: "El usuario ha sido creado",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await UserModel.findOne({ email });

    if (!userEmail) {
      return res.status(400).json({
        message: "Este usuario no existe, cree un usuario primero",
      });
    }

    const comparePassword = await userEmail.comparePassword(password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Credenciales invalidas",
      });
    }

    const token = generateToken(userEmail._id);

    generateRefreshToken(userEmail._id, res);

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const infoUser = async (req, res) => {
  try {
    const id = req.user;

    const user = await UserModel.findById(id);

    return res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    // Si esta mi token, dame el verdadero token
    const nuevoToken = generateToken(req.id);

    return res.status(200).json({
      tokenGenerate: nuevoToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};

export { register, login, infoUser, refreshToken, logout };
