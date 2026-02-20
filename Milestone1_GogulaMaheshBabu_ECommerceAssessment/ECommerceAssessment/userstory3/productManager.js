// ENUM
var Category;
(function (Category) {
    Category["Electronics"] = "Electronics";
    Category["Fashion"] = "Fashion";
})(Category || (Category = {}));
// CLASS
var Product = /** @class */ (function () {
    function Product(id, name, category, price, stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
    Product.prototype.updatePrice = function (newPrice) {
        console.log("Price updated to", newPrice);
        this.price = newPrice;
    };
    Product.prototype.updateStock = function (newStock) {
        console.log("Stock updated to", newStock);
        this.stock = newStock;
    };
    return Product;
}());
// STORE PRODUCTS USING ARRAY OF TUPLES
var inventory = [];
inventory.push([1, new Product(1, "Smart Watch", Category.Electronics, 2999, 10)]);
inventory.push([2, new Product(2, "Shoes", Category.Fashion, 2199, 15)]);
// ITERATE USING for...of
for (var _i = 0, inventory_1 = inventory; _i < inventory_1.length; _i++) {
    var _a = inventory_1[_i], id = _a[0], product = _a[1];
    console.log("ID:".concat(id, ", Name:").concat(product.name, ", Price:").concat(product.price, ", Stock:").concat(product.stock));
}
// UPDATE PRODUCT DATA
inventory[0][1].updatePrice(2799);
inventory[1][1].updateStock(12);
