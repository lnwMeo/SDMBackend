const express = require("express");
// const authRouter = require("./router/auth");

const app = express();
const port = 8000;
const { readdirSync } = require("fs");
const cors = require("cors");
// เป็น li ที่ช่วยให้ server กับ cliand ติดต่อกันได้

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

readdirSync("./router").map((c) => app.use("/api", require("./router/" + c)));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
