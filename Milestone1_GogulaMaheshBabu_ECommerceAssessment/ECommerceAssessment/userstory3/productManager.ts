enum Category {
  Electronics = "Electronics",
  Fashion = "Fashion"
}


interface IProduct {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
}


class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public category: Category,
    public price: number,
    public stock: number
  ) {}

  updatePrice(newPrice: number): void {
    console.log("Price updated to", newPrice);
    this.price = newPrice;
  }

  updateStock(newStock: number): void {
    console.log("Stock updated to", newStock);
    this.stock = newStock;
  }
}


const inventory: [number, Product][] = [];

inventory.push([1, new Product(1, "Smart Watch", Category.Electronics, 2999, 10)]);
inventory.push([2, new Product(2, "Shoes", Category.Fashion, 2199, 15)]);


for (const [id, product] of inventory) {
  console.log(
    `ID:${id}, Name:${product.name}, Price:${product.price}, Stock:${product.stock}`
  );
}


inventory[0][1].updatePrice(2799);
inventory[1][1].updateStock(12);
