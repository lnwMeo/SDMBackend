// const { check } = require("prisma");
const prisma = require("../config/db");

// exports.createCategory = async (req, res) => {
//   try {
//     const { category_name } = req.body;
//     const category = await prisma.category.create({
//       data: {
//         category_name: category_name,
//       },
//     });
//     res.send(category);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
exports.createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    // ตรวจสอบว่าชื่อ category_name ซ้ำหรือไม่
    const existingCategory = await prisma.category.findUnique({
      where: {
        category_name: category_name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "ชื่อหมวดหมู่นี้มีอยู่แล้ว" });
    }

    // สร้าง category ใหม่
    const category = await prisma.category.create({
      data: {
        category_name: category_name,
      },
    });

    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listCategory = async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        category_name,
      },
    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
