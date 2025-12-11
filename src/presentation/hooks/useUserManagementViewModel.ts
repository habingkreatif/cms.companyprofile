import { useState, useEffect } from "react";
import { User } from "../../domain/entities/user";
import { GetAllUsersUseCase } from "../../domain/usecase/admin/GetAllUsersUseCase";
import { DeleteUserUseCase } from "../../domain/usecase/admin/DeleteUserUseCase";
import { CreateUserUseCase } from "../../domain/usecase/admin/CreateUserUseCase";
import { UpdateUserUseCase } from "../../domain/usecase/admin/UpdateUserUseCase";
import { UserRepositoryImpl } from "../../data/repository/UserReposiroty";

// Manual DI
const userRepository = new UserRepositoryImpl();
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);

export function useUserManagementViewModel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsersUseCase.execute();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (uid: string) => {
    // Note: UI should handle confirmation before calling this
    setLoading(true);
    try {
      await deleteUserUseCase.execute(uid);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const addUser = async (userData: Omit<User, "id">) => {
    setLoading(true);
    setError(null);
    try {
        await createUserUseCase.execute(userData);
        await fetchUsers();
        return true;
    } catch (err: any) {
        setError(err.message);
        return false;
    } finally {
        setLoading(false);
    }
  };

  const updateUser = async (uid: string, updates: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
        await updateUserUseCase.execute(uid, updates);
        await fetchUsers();
        return true;
    } catch (err: any) {
        setError(err.message);
        return false;
    } finally {
        setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    refresh: fetchUsers,
    deleteUser,
    addUser,
    updateUser,
  };
}
