export const API_BASE_URL = "https://evanzougs.fr/b2lp/api";

export const API_ENDPOINTS = {
  login: "/login",
  register: "/register",
  logout: "/logout",
  billets: "/billets",
  billet: (id: string | number) => `/billets/${id}`,
};