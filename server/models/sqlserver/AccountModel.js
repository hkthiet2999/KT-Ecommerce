class Account{
    constructor(_id,email,password,fullname,__v){
        this._id = _id; 
        this.email = email; 
        this.password = password;
        this.fullname = fullname;
        this.__v = __v; 
    }
}

module.exports = Account;
