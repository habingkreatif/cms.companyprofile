import { UserRepository } from "../../repository/UserReposiroty";
import { User } from "../../entities/user";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: Omit<User, "id">): Promise<User> {
    // Note: This only creates the DB entry. Real auth user must be created separately if not using simple DB management.
    return this.userRepository.create(user);
  }
}
