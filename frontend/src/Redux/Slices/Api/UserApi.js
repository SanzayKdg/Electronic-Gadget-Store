import { api } from "./Api";

// Get All Users

export function getAllUsers() {
  return api.get("/admin/users");
}

// Update User Roles

export function updateUser(userId, userData) {
  return api.patch(`/admin/user/${userId}`, userData);
}
