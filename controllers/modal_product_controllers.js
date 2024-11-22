const prisma = require("../config/db");
const { connect } = require("../router/product_brand");

exports.createModel = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { model_name } = req.body;

    const productmodal = await prisma.product_Model.create({
      data: {
        model_name,
        brandId: Number(brandId),
      },
    });
    res.send(productmodal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.updataModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { model_name } = req.body;
    const productmodal = await prisma.product_Model.update({
      where: {
        id: Number(id),
      },
      data: {
        model_name,
      },
    });
    res.send(productmodal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
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
    const productmodal = await prisma.product_Model.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(productmodal);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};
