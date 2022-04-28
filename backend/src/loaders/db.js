const mongoose = require("mongoose");

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");
});

const connectDB = async () => {
  await mongoose.connect(
    `mongodb://localhost/OrderTrack`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = {
  connectDB,
};
