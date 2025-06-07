import * as orderService from "../services/Order.js";

export const createOrder = async (req, res) => {
  try {
    const {orderNumber, items, customerData, confirmationMessage } = req.body;
    const order = await orderService.createOrder(
        orderNumber,
      items,
      customerData,
      confirmationMessage
    );
    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getLatestOrder = async (req, res) => {
  try {
    const order = await orderService.getLatestOrder();
    if (!order) return res.status(404).json({ error: "No orders found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};