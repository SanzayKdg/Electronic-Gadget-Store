import { api } from "./Api";

// Get all Orders
export function getAllOrders() {
  return api.get("/admin/orders");
}
// Delete An Order
export function deleteOrder(id) {
  return api.delete(`/admin/order/${id}`);
}
// Update An Order
export function updateOrder(id, orderData) {
  return api.put(`/admin/order/${id}`, { orderData });
}
