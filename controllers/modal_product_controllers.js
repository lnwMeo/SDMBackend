const prisma = require("../config/db");
const { connect } = require("../router/product_brand");

exports.createModel = async (req, res) => {
  try {
    const { brandId, model_name } = req.body;

    // ตรวจสอบข้อมูล
    if (!brandId || !model_name) {
      return res
        .status(400)
        .json({ message: "brandId and model_name are required" });
    }

    const productmodal = await prisma.product_Model.create({
      data: {
        model_name,
        brandId: Number(brandId), // แปลง brandId เป็น Number
      },
    });

    res.status(201).json(productmodal); // ส่งข้อมูลที่สร้างกลับไปยัง Client
  } catch (err) {
    console.error("Error creating model:", err);
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.updataModel = async (req, res) => {
  const { id } = req.params; // ดึง id จาก URL
  const { brandId, model_name } = req.body; // ดึงข้อมูลจาก body

  try {
    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!id || !brandId || !model_name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // อัปเดตข้อมูลในฐานข้อมูล
    const updatedModel = await prisma.product_Model.update({
      where: { id: Number(id) },
      data: { brandId: Number(brandId), model_name },
    });

    res.status(200).json(updatedModel);
  } catch (err) {
    console.error("Error updating model:", err);
    res.status(500).json({ error: "Failed to update model" });
  }
};

exports.listBrandModal = async (req, res) => {
  try {
    const productmodal = await prisma.product_Model.findMany({
      include: {
        brand: true, // ดึงข้อมูลของ brand ที่เชื่อมโยงมาด้วย
      },
    });
    res.send(productmodal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.listModal = async (req, res) => {
  try {
    const productmodal = await prisma.product_Model.findMany();
    res.send(productmodal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.removeModal = async (req, res) => {
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

    // หากไม่มีความสัมพันธ์ ให้ดำเนินการลบ
    const productmodal = await prisma.product_Model.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(productmodal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};

