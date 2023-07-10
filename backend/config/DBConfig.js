import mongoose from "mongoose";

export const connDB = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(
          `MongoDB is connected successfully on server: ${data.connection.host}`
        );
      });
  } catch (error) {
    console.log(error, "Mongo error");
  }
};
