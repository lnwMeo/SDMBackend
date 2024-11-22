const prisma = require("../config/db");

exports.createBrand = async (req, res) => {
  try {
    const { brand_name } = req.body;
    const productbrand = await prisma.product_Brand.create({
      data: {
        brand_name,
      },
    });
    res.send(productbrand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.listBrand = async (req, res) => {
  try {
    const productbrand = await prisma.product_Brand.findMany();
    res.send(productbrand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand_name } = req.body;
    const productbrand = await prisma.product_Brand.update({
      where: {
        id: Number(id),
      },
      data: {
        brand_name,
      },
    });
    res.send(productbrand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};

exports.removeBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const productbrand = await prisma.product_Brand.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(productbrand);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!" });
  }
};
