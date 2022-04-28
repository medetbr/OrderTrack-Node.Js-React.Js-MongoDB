const ShopService = require("../services/Shop");

class Shop{
    create(req,res){
        ShopService.create(req.body)
        .then((response)=>{
            res.status(200).send(response)
        })
        .catch((err)=> res.status(500).send(err))
    }
    delete(req,res){
        ShopService.remove(req.params.id)
        .then(deleteItem => {
            console.log(deleteItem)
            if(!deleteItem) return res.status(404).send({message: "Böyle bir dükkan bulunamadı"})
            res.status(200).send("Dükkanınız başarılı bir şekilde silindi")
        })
        .catch((err)=> res.status(500).send(err))
    }
    update(req,res){  
        ShopService.modify(req.params.id,req.body)
        .then(updatedShop => {
            res.status(200).send(updatedShop);
        })
        .catch(()=> res.status(500).send({message: "Dükkan güncellenirken bir hata oluştu"}))
    }
    getShopList(req,res){  
        ShopService.shopList()
        .then(items => {
            res.status(200).send(items);
        })
        .catch((err)=> res.status(500).send({message: err}))
    }
    getShopOne(req,res){  
        ShopService.findOne({user_id :req.params.id})
        .then(item => {
            res.status(200).send(item);
        })
        .catch((err)=> res.status(500).send({message: err}))
    }
    // addMeal(req,res){  
    //     ShopService.findOne({_id :req.params.id})
    //     .then(item => {
    //         item.meals.push(req.body);
    //         item.save();
    //         res.status(200).send(item);
    //     })
    //     .catch((err)=> res.status(500).send({message: err}))
    // }
    // addDrink(req,res){  
    //     ShopService.findOne({_id :req.params.id})
    //     .then(item => {
    //         item.drinks.push(req.body);
    //         item.save();
    //         res.status(200).send(item);
    //     })
    //     .catch((err)=> res.status(500).send({message: err}))
    // }
    findUserShop(req,res){
        ShopService.findOne({user_id :req.params.id})
        .then(item => {
            res.status(200).send(item);
        })
        .catch((err)=> res.status(500).send({message: err}))
    }
    
}
module.exports = new Shop();