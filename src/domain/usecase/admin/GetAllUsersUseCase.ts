import { UserRepository } from "../../repository/UserReposiroty";
import { User } from "../../entities/user";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
