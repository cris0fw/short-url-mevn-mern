import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  longLink: {
    type: String,
    required: true,
    trim: true,
  },
  nanoLink: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ModelLinks = mongoose.model("Link", LinkSchema);
export default ModelLinks;
