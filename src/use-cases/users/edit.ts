import { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { hash } from "bcrypt";
import { IUser } from "@/models/user-model";
import { UserAlreadyExistError } from "../@errors/user-already-exist-error";

interface EditUserUseCaseRequest {
  userId: string;
  username: string;
  email: string;
  password: string;
}
interface EditUserUseCaseResponse {
  user: IUser;
}

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    email,
    username,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.password = await hash(password ?? user.password, 6);

    await this.userRepository.save(user);

    return {
      user,
    };
  }
}
