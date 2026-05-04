export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("auth_token");
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("auth_token");
}

export function logout() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("auth_token");
}