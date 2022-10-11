const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const AddProjectSchema = new mongoose.Schema(
  {
    project_name: String,
    users: [
      {
        postedBy: {
          type: ObjectId,
          ref: "Registration",
        },
      },
    ],
    created_date: {
      type: Number,
    },
    created_time: {
      type: Number,
    },
    comments: [
      {
        title: String,
        description: String,
        postedBy: {
          type: ObjectId,
          ref: "Registration",
        },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "Registration",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("ProjectsList", AddProjectSchema);