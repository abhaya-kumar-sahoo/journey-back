const express = require("express");
const router = express.Router();
const projectSchema = require("../../schema/projectSchema");
const auth = require("../../middleware/authenticate");
const AddProjectSchema = require("../../schema/RequestSchema");

router.post("/requests", auth, async (req, res) => {
  try {
    const data = await projectSchema
      .find({
        $and: [{ "users.user": req.user._id }, { "users.accepted": false }],
      })
      .populate("users.user", "name");
    const newSchema = await new AddProjectSchema({
      notification_data: data,
    });
    return res.send({ notifications: data, error: false });
    // newSchema.save().then(async (result, err) => {
    //   if (!err) {
    //     return res.send({
    //       notifications: result.notification_data,
    //       error: false,
    //     });
    //   }
    //   return res.send({ notifications: [], error: true });
    // });
  } catch (error) {
    return res.send({ error });
  }
});

const RequestUsers = router;

module.exports = RequestUsers;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRkMDMyODgwYWVmNmM1MTZkMjE1YzkiLCJpYXQiOjE2NjYwMTA5MTN9.T9fryujrvzMg7hJ4Qq3OYOcmelFalywVzT0QzYGgLG0