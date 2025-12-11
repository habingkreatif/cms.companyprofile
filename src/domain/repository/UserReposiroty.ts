import { User } from "../entities/user";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(project: Omit<User, "id">): Promise<User>;
  update(id: string, project: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
