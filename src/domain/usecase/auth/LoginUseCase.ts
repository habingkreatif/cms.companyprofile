import { AuthUser } from "../../entities/auth";
import { AuthRepository } from "../../repository/AuthRepository";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<AuthUser> {
    return this.authRepository.login(email, password);
  }
}
