const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const connect_db = require("./utils/connect_db");
const auth_router = require("./routes/auth_route");
const plan_routers = require("./routes/plan_routes");
dotenv.config();
// database connection
connect_db()
  .then((connected) => {
    if (connected) {
      console.log("databse conencted");
    }
  })
  .catch((E) => console.log(E));

const port = process.env.PORT || 5001;

app.use("/api/auth", auth_router);
app.use("/api/plan", plan_routers);
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
