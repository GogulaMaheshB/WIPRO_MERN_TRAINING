var userData = {
    id: 101,
    name: "Niti",
    salary: 54545,
};
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.sound = function () {
        console.log("".concat(this.name, " says: Woof!"));
    };
    return Dog;
}());
var obj = new Dog("dfdf");
obj.sound();
