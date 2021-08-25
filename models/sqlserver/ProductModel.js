class Product{
    constructor(_id, is_delete, date, name, desc, price, image, discount, user_id, __v){
        this._id = _id; 
        this.is_delete = is_delete; 
        this.date = date;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.image = image;
        this.discount = discount;
        this.user_id = user_id;
        this.__v = __v; 
    }
}

module.exports = Product;
