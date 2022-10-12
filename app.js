const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
app.use(cors());
const bodyparser = require("body-parser");
// api route
const api = require("./routes/api");
const app = express();

app.use(bodyparser.json());


const uri = process.env.MONGODB_URI;

//Connect to monodb atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("connected to DB......");
  })
  .catch((err) => console.log(err));
mongoose.set("debug", true);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use("/api", api);
