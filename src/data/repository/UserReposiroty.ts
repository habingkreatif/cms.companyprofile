import { ref, get, set, update, remove, push } from "firebase/database";
import { UserRepository } from "@/domain/repository/UserReposiroty";
import { User } from "@/domain/entities/user";
import { db } from "../api/firebase";

export class UserRepositoryImpl implements UserRepository {
  private collection = "users";

  // ✔ GET ALL USERS
  async getAll(): Promise<User[]> {
    const snap = await get(ref(db, this.collection));
    if (!snap.exists()) return [];

    const data = snap.val();
    return Object.values(data) as User[];
  }

  // ✔ GET USER BY ID
  async getById(id: string): Promise<User> {
    const snap = await get(ref(db, `${this.collection}/${id}`));
    if (!snap.exists()) {
      throw new Error("User not found");
    }
    return snap.val() as User;
  }

  // ✔ CREATE USER
  async create(user: Omit<User, "id">): Promise<User> {
    if (!user.uid) throw new Error("UID is required for Firebase user");

    const userData = {
      ...user,
      created_at: user.created_at?.toISOString() ?? new Date().toISOString(),
      updated_at: user.updated_at?.toISOString() ?? new Date().toISOString(),
      birth_date: user.birth_date?.toISOString(),
    };

    // Remove undefined fields to avoid Firebase errors
    Object.keys(userData).forEach(key => (userData as any)[key] === undefined && delete (userData as any)[key]);

    await set(ref(db, `${this.collection}/${user.uid}`), userData);

    return user as User;
  }

  // ✔ UPDATE USER
  async update(id: string, user: Partial<User>): Promise<User> {
    const newData: any = {
      ...user,
      updated_at: new Date().toISOString(),
    };

    if (user.created_at) newData.created_at = user.created_at.toISOString();
    if (user.birth_date) newData.birth_date = user.birth_date.toISOString();

    // Remove undefined fields
    Object.keys(newData).forEach(key => newData[key] === undefined && delete newData[key]);

    await update(ref(db, `${this.collection}/${id}`), newData);

    const updatedSnap = await get(ref(db, `${this.collection}/${id}`));

    return updatedSnap.val() as User;
  }

  // ✔ DELETE USER
  async delete(id: string): Promise<void> {
    await remove(ref(db, `${this.collection}/${id}`));
  }
}
