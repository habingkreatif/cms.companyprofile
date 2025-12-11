import { UserRepository } from "../../repository/UserReposiroty";
import { User } from "../../entities/user";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(uid: string, updates: Partial<User>): Promise<User> {
    return this.userRepository.update(uid, updates);
  }
}
