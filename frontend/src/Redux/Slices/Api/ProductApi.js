import { api, api1 } from "./Api";

// Create a Product
export function createProduct(productData) {
    return api1.post("/product/new", {productData});
  }
// Get all Products
export function getAllProducts() {
  return api.get("/admin/products");
}
// Delete A Product
export function deleteProduct(id) {
  return api.delete(`/admin/product/${id}`);
}
// Update A Product
export function updateProduct(id, productData) {
  return api.put(`/admin/product/${id}`, { productData });
}

