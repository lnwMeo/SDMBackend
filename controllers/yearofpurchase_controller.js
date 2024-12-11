const prisma = require("../config/db");

exports.createYear = async (req, res) => {
  try {
    const { year } = req.body;
    // ตรวจสอบข้อมูลซ้ำไหม
    const existingyaer = await prisma.year_of_purchase.findUnique({
      where: {
        year: year,
      },
    });
    if (existingyaer) {
      return res.status(400).json({ message: "ปีนี้อยู่แล้ว" });
    }

    const newyears = await prisma.year_of_purchase.create({
      data: {
        year: year,
      },
    });

    // ส่งข้อมูลกลับ
    res.status(200).json(newyears);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listYear = async (req, res) => {
  try {
    const year = await prisma.year_of_purchase.findMany();
    res.send(year);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeYear = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบว่ามี Product ที่เชื่อมโยงกับ Product_Model นี้อยู่หรือไม่
    const relatedProducts = await prisma.product.findMany({
      where: {
        product_modelId: Number(id),
      },
    });

    // หากมี Product ที่เชื่อมโยงอยู่ ให้ปฏิเสธการลบ
    if (relatedProducts.length > 0) {
      return res
        .status(400)
        .json({ message: "ไม่สามารถลบได้เนื่องจากมีสินค้าเชื่อมโยงอยู่" });
    }

    const year = await prisma.year_of_purchase.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(year);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateYear = async (req, res) => {
  try {
    const { id } = req.params;
    const { year } = req.body;
    const years = await prisma.year_of_purchase.update({
      where: {
        id: Number(id),
      },
      data: {
        year,
      },
    });
    res.send(years);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
