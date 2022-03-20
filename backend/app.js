const express = require("express");
const mongoose = require("mongoose");
// api route
const api = require("./routes/api");
const app = express();
app.use("/api", api);

const mongodb = "mongodb://127.0.0.1/notedDB";

mongoose.connect(mongodb).catch((err) => {
  console.log(`mongodb connection error: ${err}`);
});

const db = mongoose.connection;


//to log errors after initial connection
db.on("error", (err) => {
  console.log(`mongoDB error: ${err}`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
