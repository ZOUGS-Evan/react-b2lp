export const API_BASE_URL = 'https://evanzougs.fr/b2lp/api';

export const API_ENDPOINTS = {
  billets: `${API_BASE_URL}/billets`,
  billet: (id: string | number) => `${API_BASE_URL}/billets/${id}`,
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  logout: `${API_BASE_URL}/logout`,
};