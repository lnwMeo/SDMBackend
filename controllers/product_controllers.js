const { check } = require("prisma");
const prisma = require("../config/db");
const fs = require("fs");
const path = require("path");

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
    res.status(500).json({ massages: "Server Error!!!" });
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
      // borrowStatus,
      product_brandId,
      product_modelId,
      basketId,
    } = req.body;

    // const borrowStatusBoolean = borrowStatus === "true";
    const id = req.params.id; // สมมติว่า ID ของสินค้าถูกส่งมาผ่าน URL parameter

    // ตรวจสอบว่า product_model ถูกเชื่อมโยงกับ product_brand หรือไม่
    if (product_modelId && product_brandId) {
      const isModelLinkedToBrand = await prisma.product_Model.findFirst({
        where: {
          id: parseInt(product_modelId),
          brandId: parseInt(product_brandId),
        },
      });
      if (!isModelLinkedToBrand) {
        return res.status(400).json({
          message: "Model ที่เลือกไม่เชื่อมโยงกับ Brand ที่ระบุ",
        });
      }
    }

    // เพิ่มเฉพาะฟิลด์ที่มีค่าในอ็อบเจกต์ updateData
    const updateData = {};
    if (productname) updateData.productname = productname;
    if (serialnumber) updateData.serialnumber = serialnumber;
    if (serialproduct) updateData.serialproduct = serialproduct;
    if (contract_start_date)
      updateData.contract_start_date = new Date(contract_start_date);
    if (contract_end_date)
      updateData.contract_end_date = new Date(contract_end_date);
    if (categoryId)
      updateData.category = { connect: { id: parseInt(categoryId) } };
    if (product_brandId)
      updateData.product_brand = { connect: { id: parseInt(product_brandId) } };
    if (product_modelId)
      updateData.product_model = { connect: { id: parseInt(product_modelId) } };
    if (basketId) updateData.basket = { connect: { id: parseInt(basketId) } };

    // จัดการไฟล์รูปภาพถ้ามีการอัปโหลดไฟล์
    const images = req.files
      ? req.files.map((file) => ({
          filename: file.filename,
          path: `assets/product/${file.filename}`,
        }))
      : [];
    if (images.length > 0) updateData.images = { create: images };

    // อัปเดตข้อมูลสินค้า
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.send(product);
    console.log(updateData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // ดึงข้อมูล product และรูปภาพที่เกี่ยวข้อง
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ลบไฟล์ภาพจากระบบไฟล์
    if (product.images && product.images.length > 0) {
      product.images.forEach((image) => {
        const filePath = path.join(
          __dirname,
          "../assets/product",
          image.filename
        );
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete image:", err);
        });
      });
    }

    // ลบ product และข้อมูลใน database
    await prisma.product.delete({
      where: { id: productId },
    });

    res.json({
      message: "Product and associated images deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!!!" });
  }
};

exports.listProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      include: {
        images: true,
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};

exports.productincard = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      include: {
        images: true,
        category: true,
      },
    });

    const productincard = product.map((product) => ({
      id: product.id,
      productname: product.productname,
      category_name: product.category.category_name, // แก้ไขส่วนนี้
      first_image: product.images,
    }));

    res.send(productincard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};

exports.listProductByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const product = await prisma.product.findMany({
      where: {
        categoryId: parseInt(categoryId),
      },
      include: {
        images: true,
        category: true,
      },
    });

    const listproductbycategory = product.map((product) => ({
      id: product.id,
      productname: product.productname,
      category_name: product.category.category_name, // แก้ไขส่วนนี้
      first_image: product.images,
    }));
    res.send(listproductbycategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};

exports.listProductBySearch = async (req, res) => {
  const { keyword } = req.query;
  try {
    const product = await prisma.product.findMany({
      where: {
        productname: keyword
          ? {
            contains: keyword.toLowerCase(),
            }
          : undefined,
      },
      include: {
        images: true,
        category: true,
      },
    });

    const SearchProduct = product.map((product) => ({
      id: product.id,
      productname: product.productname,
      category_name: product.category.category_name, // แก้ไขส่วนนี้
      first_image: product.images,
    }));
    res.send(SearchProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
