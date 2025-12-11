export interface AuthUser {
  uid: string;
  email: string | null;
  photoURL: string | null;
  // Extended Profile Fields
  username?: string;
  role?: "user" | "admin" | "superadmin";
  position?: string;
  department?: string;
  phone?: string;
  address?: string;
  created_at?: string;
}
