// const { check } = require("prisma");
const prisma = require("../config/db");

exports.createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await prisma.category.create({
      data: {
        category_name: category_name,
      },
    });
    res.send(category);
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
    console.log(err)
    res.status(500).json({message:"Server Error"})
  }
};
