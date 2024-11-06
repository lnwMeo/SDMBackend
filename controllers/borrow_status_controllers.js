const prisma = require("../config/db")

exports.createBorrowStatus = async (req,res)=>{
    res.json({massages : "Status Borrow"})
}
exports.updateBorrowStatus = async (req,res)=>{
    res.status(200).json({massages : "Update Sccress!!!"})
}