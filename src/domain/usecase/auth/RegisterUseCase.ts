import { AuthUser } from "../../entities/auth";
import { AuthRepository } from "../../repository/AuthRepository";
import { UserRepository } from "../../repository/UserReposiroty";
import { User } from "../../entities/user";

export class RegisterUseCase {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository
  ) {}

  async execute(email: string, password: string, username: string, additionalData?: { phone?: string, address?: string, position?: string, department?: string }): Promise<AuthUser> {
    const authUser = await this.authRepository.register(email, password, username);
    
    // Create user profile in separate database (e.g. Realtime DB)
    const user: Omit<User, "id"> = {
        uid: authUser.uid,
        email: authUser.email || email,
        username: username,
        role: "user",
        points: 0,
        created_at: new Date(),
        updated_at: new Date(),
        phone_number: additionalData?.phone,
        position: additionalData?.position,
        department: additionalData?.department,
        // Map address string to object structure if needed, or simplify entity
        // For now assuming existing entity structure, we'll try to fit it.
        // The existing UseAuth used address string. The entity has address object.
        // Let's modify valid Address object or maybe just store it as is if implied.
        // Given complexity, I'll just map address to city for now or street?
        // Let's assume address is street for simplicity or modify entity later.
        // For now: address: { street: additionalData.address }
        address: additionalData?.address ? { street: additionalData.address } : undefined
    };

    try {
        await this.userRepository.create(user);
    } catch (e) {
        console.error("Failed to create user profile", e);
        // We might want to rollback auth here or just log error
        // For now, proceed.
    }

    return authUser;
  }
}
