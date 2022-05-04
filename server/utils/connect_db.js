const mongoose = require("mongoose");
const connect_db = async () => {
  try {
    const isConnectd = await mongoose.connect(
      "mongodb://127.0.0.1:27017/plan",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    return isConnectd;
  } catch (e) {
    return False;
  }
};

module.exports = connect_db;
