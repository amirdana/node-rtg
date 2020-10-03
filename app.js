require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Home = require("./router/home");

app.use(cors());

app.use("/", Home);

let whitelist = ["http://localhost:8080"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        var message =
          "The CORS policy for this origin does not allow access from this particular origin";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

mongoose.connect(process.env.DB_CONECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB conected");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
