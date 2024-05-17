import ModelLinks from "../schemas/Link.js";

const redirectLink = async (req, res) => {
  try {
    const nanolink = req.params.nanolink;
    const findLink = await ModelLinks.findOne({ nanoLink: nanolink });

    return res.status(200).json(findLink);
  } catch (error) {
    console.log(error);
  }
};

export { redirectLink };
