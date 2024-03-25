import { IAssignUser, IUserCreate } from "@/models/user-model";
import { UserRepository } from "@/repositories/user-repository";

export class CreateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(data: IUserCreate) {
    const user = await this.usersRepository.create(data);

    return user;
  }
}
