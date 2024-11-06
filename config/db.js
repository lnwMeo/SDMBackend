// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost", // ใส่ host ของคุณ
//   user: "root",
//   password: "",
//   database: "sdm",
// });

// connection.connect((err) => { // แก้ไขจาก connent เป็น connect
//   if (err) {
//     console.error("Error connecting to MySQL!!!", err);
//     return;
//   }

//   console.log("Connected to MySQL Successfully!!");
// });

// module.exports = connection;

const {PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = prisma