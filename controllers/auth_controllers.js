const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, agency, tel } = req.body;
    // รับ email password จาก body
    if (!username || !email || !password || !agency || !tel) {
      return res.status(400).json({ message: "All fields is required!!!" });
    }

    // เช็ค username ใน DB
    const Checkuser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    // ถ้ามี
    if (Checkuser) {
      return res.status(400).json({ message: "Username already exits!!!!!" });
    }
    // HashPassword
    const hashPassword = await bcrypt.hash(password, 10);

    // registr
    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashPassword,
        agency: agency,
        tel: tel,
      },
    });
    // console.log(username, password);
    res.status(201).json({ message: "Register Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ massags: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // เช็ค username
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not foubnd or not Enabled" });
    }
    // เช็ค password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ massags: "Password Invaild!!!!!!!!" });
    }
    // เช็ค payload
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    // เช็ค gen token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "3h" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      res.json({ payload, token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
