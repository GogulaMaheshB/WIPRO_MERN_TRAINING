const pool = require("../db/connection");

exports.placeOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { custname, items } = req.body;
    let totalAmount = 0;

    await connection.beginTransaction();

    for (const item of items) {
      const [rows] = await connection.query(
        "SELECT price, stock FROM products WHERE id = ?",
        [item.product_id]
      );

      if (rows.length === 0) {
        throw new Error("Product not found");
      }

      if (rows[0].stock < item.quantity) {
        throw new Error("Insufficient stock");
      }

      totalAmount += rows[0].price * item.quantity;

      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    const [orderResult] = await connection.query(
      "INSERT INTO orders (custname, totalamount) VALUES (?, ?)",
      [custname, totalAmount]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.product_id, item.quantity]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      orderId
    });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};
