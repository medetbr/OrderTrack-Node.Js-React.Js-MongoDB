class BaseService{
    constructor(BaseModel){
        this.BaseModel = BaseModel;
    }
    create(obje){
        return new this.BaseModel(obje).save();
    }
    remove(id){
        return this.BaseModel.findByIdAndDelete(id);
    }
    modify(id,obje){
        return this.BaseModel.findByIdAndUpdate(id,obje,{new:true})
    }
    list(where){
        return this.BaseModel.find(where || {});
    }
}
module.exports = BaseService;