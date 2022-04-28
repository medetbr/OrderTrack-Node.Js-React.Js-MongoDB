const BaseService = require("./BaseService");
const BaseModel = require("../models/Shop");

class ShopService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  findOne(where){
    return BaseModel.findOne(where)
  }
  shopList(where){
    return BaseModel.find(where)
      .populate({
        path: "user_id",
        select: "name",
    })
  }
}
module.exports = new ShopService();
