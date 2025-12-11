import { UserRepository } from "../../repository/UserReposiroty";
import { User } from "../../entities/user";
import { AuthRepository } from "../../repository/AuthRepository";

export class UpdateProfileUseCase {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository
  ) {}

  async execute(uid: string, updates: Partial<User>): Promise<User> {
    // 1. Update in Realtime Database
    const updatedUser = await this.userRepository.update(uid, updates);

    // 2. If username is updated, we could optionally update Firebase Auth displayName
    // but since we rely on DB, it's not strictly necessary, but good for consistency.
    // For now, let's just focus on DB.
    
    return updatedUser;
  }
}
