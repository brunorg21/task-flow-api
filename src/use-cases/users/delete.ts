import { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.userRepository.delete(user.id);
  }
}
