import { UserRepository } from "../../repository/UserReposiroty";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(uid: string): Promise<void> {
    return this.userRepository.delete(uid);
  }
}
