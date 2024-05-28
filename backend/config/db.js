const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
      {
        writeConcern: { w: "majority" },
      }
    );
    console.log(
      `\nMONGOdb connection success: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.log("MONGOdb connection error", error);
    process.exit(1);
  }
};

module.exports = connectDB;