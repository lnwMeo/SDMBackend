const { check } = require("prisma");
const prisma = require("../config/db");

exports.createProduct = async (req, res) => {
  try {
    const {
      productname,
      serialnumber,
      serialproduct,
      contract_start_date,
      contract_end_date,
      categoryId,
      borrowStatus,
      product_brandId,
      product_modelId,
      basketId,
      asset_id,
      public_id,
    } = req.body;

    const borrowStatusBoolean = borrowStatus === "true";

    const isModelLinkedToBrand = await prisma.product_Model.findFirst({
      where: {
        id: parseInt(product_modelId),
        brandId: parseInt(product_brandId),
      },
    });

    if (!isModelLinkedToBrand) {
      return res.status(400).json({
        message: "The selected model is not linked to the specified brand.",
      });
    }

    const images = req.files
      ? req.files.map((file) => ({
          asset_id: asset_id || "default_asset_id", // ตรวจสอบว่า asset_id ถูกส่งใน req.files
          public_id: public_id || "default_pubilc_id",
          filename: file.filename,
          path: `assets/product/${file.filename}`,
        }))
      : [];

    const product = await prisma.product.create({
      data: {
        productname: productname,
        serialnumber: serialnumber,
        serialproduct: serialproduct,
        contract_start_date: contract_start_date
          ? new Date(contract_start_date)
          : null,
        contract_end_date: contract_end_date
          ? new Date(contract_end_date)
          : null,
        category: {
          connect: { id: parseInt(categoryId) },
        },
        borrowStatus: {
          create: {
            borrow_status: borrowStatusBoolean,
          },
        },
        product_brand: {
          connect: { id: parseInt(product_brandId) },
        },
        product_model: {
          connect: { id: parseInt(product_modelId) },
        },
        basket: basketId
          ? {
              connect: { id: parseInt(basketId) },
            }
          : undefined,
        images: {
          create: images,
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massages: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      productname,
      serialnumber,
      serialproduct,
      contract_start_date,
      contract_end_date,
      categoryId,
      borrowStatus,
      product_brandId,
      product_modelId,
      basketId,
      asset_id,
      public_id,
    } = req.body;

    const borrowStatusBoolean = borrowStatus === "true";

    const isModelLinkedToBrand = await prisma.product_Model.findFirst({
      where: {
        id: parseInt(product_modelId),
        brandId: parseInt(product_brandId),
      },
    });

    if (!isModelLinkedToBrand) {
      return res.status(400).json({
        message: "The selected model is not linked to the specified brand.",
      });
    }

    const images = req.files
      ? req.files.map((file) => ({
          asset_id: asset_id || "default_asset_id", // ตรวจสอบว่า asset_id ถูกส่งใน req.files
          public_id: public_id || "default_pubilc_id",
          filename: file.filename,
          path: `assets/product/${file.filename}`,
        }))
      : [];

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        productname: productname,
        serialnumber: serialnumber,
        serialproduct: serialproduct,
        contract_start_date: contract_start_date
          ? new Date(contract_start_date)
          : null,
        contract_end_date: contract_end_date
          ? new Date(contract_end_date)
          : null,
        category: {
          connect: { id: parseInt(categoryId) },
        },
        borrowStatus: {
          create: {
            borrow_status: borrowStatusBoolean,
          },
        },
        product_brand: {
          connect: { id: parseInt(product_brandId) },
        },
        product_model: {
          connect: { id: parseInt(product_modelId) },
        },
        basket: basketId
          ? {
              connect: { id: parseInt(basketId) },
            }
          : undefined,
        images: {
          create: images,
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massages: "Server Error" });
    
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const removeProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
      include: {
        images: true, // ลบ images ที่เชื่อมโยงด้วย
      },
    });

    res.send(removeProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.listProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
