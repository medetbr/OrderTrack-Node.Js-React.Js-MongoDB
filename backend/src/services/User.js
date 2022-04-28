const BaseService = require("./BaseService");
const BaseModel = require("../models/User");
const bcrypt = require("bcrypt");

class UserService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  async login(obje) {
    const user = await BaseModel.findOne({ username: obje.username });
    const password = await bcrypt.compare(obje.password, user.password);

    if (user) {
      if (password) {
        const { password, ...others } = user._doc;
        return others;
      } else {
        throw "Şifre hatalı..";
      }
    } else {
      throw "Giriş başarısız";
    }
  }
  async getUser(id){
    const user = await BaseModel.findById(id);
    const { password, ...others } = user._doc;
        return others;
  }
}
module.exports = new UserService();
