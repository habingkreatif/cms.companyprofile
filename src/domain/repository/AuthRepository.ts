import { AuthUser } from "../entities/auth";

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthUser>;
  register(email: string, password: string, username: string): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  observeAuthState(callback: (user: AuthUser | null) => void): () => void;
}
