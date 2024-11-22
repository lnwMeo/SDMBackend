const prisma = require("../config/db");
const { connect } = require("../router/product");

exports.productinOrder = async (req,res)=>{
    const {userId,product}=req.body;

    const newOrder = await prisma.order.create({
        data:{
            userId:userId,
            product:{
                connect:product.map(product=>({id:product.id}))
            }
            status:
        }
    })
}