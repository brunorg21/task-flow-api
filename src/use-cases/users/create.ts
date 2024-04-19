import { IUserCreate } from "@/models/user-model";
import { UserRepository } from "@/repositories/user-repository";
import { UserAlreadyExistError } from "../errors/user-already-exist-error";

export class CreateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(data: IUserCreate) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (user) {
      throw new UserAlreadyExistError();
    }

    const createdUser = await this.usersRepository.create(data);

    return createdUser;
  }
}
