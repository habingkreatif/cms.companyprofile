export interface User {
  uid: string;
  email: string;
  username?: string;
  full_name?: string;
  phone_number?: string;
  last_login?: string;
  address?: {
    street?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    country?: string;
  };
  birth_date?: Date;
  profile_picture?: string;
  role: "user" | "admin" | "superadmin";
  position?: string;
  department?: string;
  points: number;
  created_at: Date;
  updated_at: Date;
  preferences?: {
    theme: "light" | "dark" | "system";
    language: string;
    notifications: boolean;
  };
}
