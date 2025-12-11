import { User } from "../entities/user";
import { UserRepository } from "../repository/UserReposiroty";

export class CreateUser {
  constructor(private repository: UserRepository) {}

  async execute(user: User): Promise<User> {
    return this.repository.create(user);
  }
}

export class GetUsers {
  constructor(private repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.repository.getAll();
  }
}

export class GetDetailUser {
  constructor(private repository: UserRepository) {}

  async execute(id: string): Promise<User> {
    return this.repository.getById(id);
  }
}

export class UpdateUser {
  constructor(private repository: UserRepository) {}

  async execute(id: string, user: User): Promise<User> {
    return this.repository.update(id, user);
  }
}

export class DeleteUser {
  constructor(private repository: UserRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
