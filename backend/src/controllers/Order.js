const OrderService = require("../services/Order");

class Order {
  create(req, res) {
    let total = 0;
    let quantity = 0;
    OrderService.create(req.body)
      .then((response) => {
        response.meals.map((mealItem) => {
          total += parseInt(mealItem.quantity) * parseInt(mealItem.price);
          quantity += parseInt(mealItem.quantity);
        });
        response.drinks.map((mealItem) => {
          total += parseInt(mealItem.quantity) * parseInt(mealItem.price);
          quantity += parseInt(mealItem.quantity);
        });
        response.total = { totalAmount: total, quantity };
        total = 0;
        quantity = 0;
        response.save();
        res.status(200).send(response);
      })
      .catch((err) => res.status(500).send(err));
  }
  delete(req, res) {
    OrderService.remove(req.params.id)
      .then((deleteItem) => {
        if (!deleteItem)
          return res
            .status(404)
            .send({ message: "Böyle bir sipariş bulunamadı" });
        res.status(200).send("Siparişiniz başarılı bir şekilde silindi");
      })
      .catch((err) => res.status(500).send(err));
  }
  update(req, res) {
    OrderService.modify(req.params.id, req.body)
      .then((updatedOrder) => {
        res.status(200).send(updatedOrder);
      })
      .catch(() =>
        res
          .status(500)
          .send({ message: "Sipariş güncellenirken bir hata oluştu" })
      );
  }
  fetchOrder(req, res) {
    OrderService.orderList({ shop_id: req.params.id })
      .then((item) => {
        res.status(200).send(item);
      })
      .catch((err) => res.status(500).send({ message: err }));
  }
  getOrder(req, res) {
    OrderService.findOrder({ user_id: req.params.id })
      .then((item) => {
        res.status(200).send(item);
      })
      .catch((err) => res.status(500).send({ message: err }));
  }
}
module.exports = new Order();
