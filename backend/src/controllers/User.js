const UserService = require("../services/User");
const bcrypt = require("bcrypt");
class User{
    create(req,res){
        req.body.password = bcrypt.hashSync(req.body.password,8);
        UserService.create(req.body)
        .then((response)=>{
            res.status(200).send(response)
        })
        .catch((err)=> res.status(500).send(err))
    }
    delete(req,res){
        UserService.remove(req.params.id)
        .then(deleteItem => {
            console.log(deleteItem)
            if(!deleteItem) return res.status(404).send({message: "Böyle bir kullanıcı bulunamadı"})
            res.status(200).send("Kullanıcı başarılı bir şekilde silindi")
        })
        .catch((err)=> res.status(500).send(err))
    }
    update(req,res){
        if(req.body.password ) req.body.password = bcrypt.hashSync(req.body.password,8);
        UserService.modify(req.params.id,req.body)
        .then(updatedUser => {
            const {password, ...others} = updatedUser._doc;
            res.status(200).send(others);
        })
        .catch(()=> res.status(500).send({message: "Kulanıcı güncellenirken bir hata oluştu"}))
    }
    login(req,res){
        UserService.login(req.body)
        .then(user => {
            res.status(200).send(user);
        })
        .catch((err)=> res.status(500).send({message: err}))
    }
    getUser(req,res){
        UserService.getUser(req.params.id)
        .then(user => {
            res.status(200).send(user);
        })
        .catch((err)=> res.status(500).send({message: err}))
    }
}
module.exports = new User();