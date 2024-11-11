const prisma = require("../config/db");
exports.updateStatusStock = async (req, res) => {
  try {
    const { orderId, isApproved } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { approved: isApproved },
      include: {
        basket: {
          include: {
            products: true,
          },
        },
      },
    });
    if(order.basket && order.basket.products){
        for(const product of order.basket.products){
            await prisma.product.update({
                where:{id:product.id},
                data:{stockProductStatus: !isApproved},
            })
        }
    }
    res.status(200).json({massages:"Updata Status Stock Success!!!"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ massages: "Server Error!!!" });
  }
};
