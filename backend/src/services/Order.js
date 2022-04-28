const BaseService = require("./BaseService");
const BaseModel = require("../models/Order");

class OrderService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  orderList(where){
    return BaseModel.find(where)
      .populate({
        path: "user_id",
        select: "name surname",
    })
  }
  async findOrder(where){
    const order = await BaseModel.find(where).populate({
      path: "shop_id",
      select: "name",
  });
  return order;
  }
 }
module.exports = new OrderService();
