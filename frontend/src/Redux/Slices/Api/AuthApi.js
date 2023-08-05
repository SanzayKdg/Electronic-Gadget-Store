import { api } from "./Api";

// login

export function login(email, password) {
  return api.post("/login", { email, password });
}

// logout

export function logout() {
  return api.get("/logout");
}
