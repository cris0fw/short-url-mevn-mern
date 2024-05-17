import ModelLinks from "../schemas/Link.js";
import { nanoid } from "nanoid";

const getAllsLinks = async (req, res) => {
  try {
    const getAlls = await ModelLinks.find({ uid: req.user });

    return res.status(200).json(getAlls);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error de servidor",
    });
  }
};

const createLink = async (req, res) => {
  try {
    let { longLink } = req.body;

    if (!longLink.startsWith("https://")) {
      longLink = "https://" + longLink;
    }

    const newLink = new ModelLinks({
      longLink: longLink,
      nanoLink: nanoid(6),
      uid: req.user,
    });

    const saveLink = await newLink.save();

    return res.status(201).json(saveLink);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "error de servidor",
    });
  }
};

const getSingleLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await ModelLinks.findOne({ nanoLink });

    if (!link) {
      return res.status(404).json({
        message: "No existe el link",
      });
    }

    return res.status(200).json({
      longLink: link.longLink,
    });
  } catch (error) {
    if (error.name === "CastError" && error.path === "_id") {
      // Manejar el error de CastError
      return res.status(400).json({
        message: "Formato de objectID inválido",
      });
    }

    console.log(error.kind);
  }
};

const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await ModelLinks.findByIdAndDelete(id);

    if (!link) {
      return res.status(404).json({
        message: "No existe el link",
      });
    }

    if (!link.uid.equals(req.user)) {
      return res.status(404).json({
        message: "No le pertenece la id",
      });
    }

    return res.status(200).json(link);
  } catch (error) {
    if (error.name === "CastError" && error.path === "_id") {
      // Manejar el error de CastError
      return res.status(400).json({
        message: "Formato de objectID inválido",
      });
    }

    console.log(error.kind);
  }
};

const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { longLink } = req.body;

    if (!longLink.startsWith("https://")) {
      longLink = "https://" + longLink;
    }

    const link = await ModelLinks.findById(id);

    if (!link) {
      return res.status(404).json({
        message: "No existe el link",
      });
    }

    if (!link.uid.equals(req.user)) {
      return res.status(404).json({
        message: "No le pertenece la id",
      });
    }

    link.longLink = longLink;
    await link.save();

    return res.status(200).json(link);
  } catch (error) {
    if (error.name === "CastError" && error.path === "_id") {
      // Manejar el error de CastError
      return res.status(400).json({
        message: "Formato de objectID inválido",
      });
    }

    console.log(error.kind);
  }
};

export { getAllsLinks, createLink, getSingleLink, removeLink, updateLink };
