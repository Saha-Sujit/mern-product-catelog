const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB);
    console.log("Connected to database succesfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to database");
  }
};
