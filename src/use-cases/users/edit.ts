import { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { hash } from "bcrypt";

interface EditUserUseCaseRequest {
  userId: string;
  username: string | null;
  email: string | null;
  password: string | null;
}

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId, email, username, password }: EditUserUseCaseRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.password = await hash(password ?? user.password, 6);

    await this.userRepository.save(user);
  }
}
