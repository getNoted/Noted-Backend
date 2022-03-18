const express = require("express");

// api route
const api = require("./routes/api");
const app = express();
app.use("/api", api);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
