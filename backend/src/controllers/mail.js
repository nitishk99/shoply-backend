import { sendMail } from "../services/mail.js";

export const sendMailController = async (req, res) => {
  try {
    const { status } = req.body;

    let to, subject, text, html;

    if (status === "success") {
      const { orderNumber, email, items, customerData, confirmationMessage } =
        req.body;
      to = email;
      subject = `Order Success - Order #${orderNumber}`;
      text = `Your order was successful!\nOrder Number: ${orderNumber}\nItems: ${JSON.stringify(
        items
      )}\nCustomer Info: ${JSON.stringify(
        customerData
      )}\nMessage: ${confirmationMessage}`;
      html = `
  <h2>Your order was successful!</h2>
  <p><strong>Order Number:</strong> ${orderNumber}</p>
  <h3>Order Items:</h3>
  <table border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse;">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      ${items
        .map(
          (item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
  <h3>Customer Info:</h3>
  <ul>
    ${Object.entries(customerData)
      .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
      .join("")}
  </ul>
  <p><strong>Message:</strong> ${confirmationMessage}</p>
`;
    } else {
      const { email } = req.body;
      to = email;
      subject = status === "decline" ? "Order Declined" : "Order Error";
      text = `Your order could not be processed. Status: ${status}`;
      html = `<h2>Your order could not be processed.</h2><p>Status: ${status}</p>`;
    }

    const result = await sendMail({ to, subject, text, html });
    if (result.success) {
      res
        .status(200)
        .json({ message: "Email sent successfully", info: result.info });
    } else {
      res
        .status(500)
        .json({ error: "Failed to send email", details: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
