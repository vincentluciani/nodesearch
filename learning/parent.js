

class Parent {
    constructor(message) {
        this.sayHello = function (message) {
            console.log(message+". I learned this from my parent");
        };
    }
}

module.exports = Parent;
