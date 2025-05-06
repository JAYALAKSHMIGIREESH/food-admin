import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";


const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      console.warn("No token provided.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      console.log("Fetched Orders Response:", response.data);

      if (response.data.orders && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        toast.warn("Orders not returned or invalid format.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message || "Fetch failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container-fluid mt-4">
      <h4 className="mb-4 text-center">All Orders</h4>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Quantities</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{order.address?.name || "N/A"}</td>
                  <td>{order.address?.phone || "N/A"}</td>
                  <td>
                    {order.items.map((item, i) => (
                      <div key={i}>{item.name}</div>
                    ))}
                  </td>
                  <td>
                    {order.items.map((item, i) => (
                      <div key={i}>{item.quantity}</div>
                    ))}
                  </td>
                  <td>{new Date(Number(order.date)).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                  <td>${Number(order.amount).toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.payment ? "Done" : "Pending"}</td>
                  <td>
                    <select
                      className="form-control form-control-sm"
                      defaultValue={order.status}
                    >
                      <option value="Ordered">Ordered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
