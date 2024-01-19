const users = require("../models/userSchema");
const moment = require("moment");

// user post :
exports.userpost = async (req, res) => {
  // 1. fname,lname,... from body
  // 2. image
  // console.log(req.file);
  // console.log(req.body);
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, location, status } = req.body;
  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !location ||
    !status ||
    !file
  ) {
    res.status(401).json("All inputs required");
  }

  try {
    //to check is data already exists
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(401).json("This user already exists ");
    } else {
      const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        dateCreated,
      });
      console.log(userData);
      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block error ");
  }
};

// user get
exports.userget = async (req, res) => {
  const search = req.query.search || "";
  const gender = req.query.gender || "";
  const status = req.query.status || "";
  const sort = req.query.sort || "";

  const query = {
    fname: { $regex: search, $options: "i" }, //$options:"i" ->avoids camel casing
  };
  if (gender !== "All") {
    query.gender = gender;
  }
  if (status !== "All") {
    query.status = status;
  }

  try {
    const usersData = await users
      .find(query)
      .sort({ dateCreated: sort == "new" ? -1 : 1 });
    res.status(200).json(usersData);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.singleuserget = async (req, res) => {
  const { id } = req.params;
  try {
    const userdata = await users.findOne({ _id: id });
    res.status(200).json(userdata);
  } catch (error) {
    res.status(401).json(error);
  }
};

// user edit
exports.useredit = async (req, res) => {
  const { id } = req.params;
  const {
    fname,
    lname,
    email,
    mobile,
    gender,
    location,
    status,
    user_profile,
  } = req.body;
  const file = req.file ? req.file.filename : user_profile; //if image not changed show the prev img
  const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  try {
    const updateuser = await users.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        profile: file,
        dateUpdated,
      },
      {
        new: true,
      }
    );
    await updateuser.save();
    res.status(200).json(updateuser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// delete user
exports.userdelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteuser = await users.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(401).json(error);
  }
};
