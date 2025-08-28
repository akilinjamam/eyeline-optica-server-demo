import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const port = config.port;

const main: () => void = async () => {
  try {
    await mongoose.connect(config.db_url as string);

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
