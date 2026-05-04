export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("auth_token") !== null;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("auth_token");
}