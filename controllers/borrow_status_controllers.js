const prisma = require("../config/db")

// Controller สำหรับเปิด - ปิด borrow_status
exports.updateBorrowStatus = async (req, res) => {
    try {
        const { productId } = req.params;
        const { borrowStatus } = req.body;
    
        // ตรวจสอบว่า borrowStatus มีการส่งมาและเป็น Boolean
        if (typeof borrowStatus !== 'boolean') {
          return res.status(400).json({ message: "borrowStatus ต้องเป็นค่า true หรือ false เท่านั้น" });
        }
    
        // ตรวจสอบว่ามี borrow_status ที่อ้างถึง productId นั้นหรือไม่
        const existingBorrowStatus = await prisma.borrow_Status.findUnique({
          where: { productId: parseInt(productId) },
        });
    
        if (!existingBorrowStatus) {
          return res.status(404).json({ message: "Borrow status not found." });
        }
    
        // อัพเดทค่า borrow_status
        const updatedStatus = await prisma.borrow_Status.update({
          where: { productId: parseInt(productId) },
          data: { borrow_status: borrowStatus }, // ใช้ค่าที่ส่งมาโดยตรง
        });
    
        res.status(200).json({ message: "Borrow status updated successfully.", updatedStatus });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
  };
  