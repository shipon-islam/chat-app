const { Connection, connect } = require("mongoose");
const { DB_URL } = require("./envVariable");

const dbConnect = async () => {
  try {
    const connected = await connect(DB_URL);
    console.log("database connected successfuly");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { dbConnect };
