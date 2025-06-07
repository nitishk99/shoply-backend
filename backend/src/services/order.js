import Order from '../models/Order.js';



export const createOrder = async (orderNumber,items, customerData, confirmationMessage) => {

  const order = new Order({
    orderNumber,
    items,
    customerData,
    confirmationMessage
  });
  await order.save();
  return order;
};

export const getLatestOrder = async () => {
  return await Order.findOne().sort({ createdAt: -1 });
};