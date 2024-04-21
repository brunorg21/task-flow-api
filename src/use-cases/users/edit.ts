import { UserRepository } from "@/repositories/user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { hash } from "bcrypt";
import { IUser } from "@/models/user-model";

interface EditUserUseCaseRequest {
  userId: string;
  username: string | null;
  email: string | null;
  password: string | null;
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

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.password = await hash(password ?? user.password, 6);

    await this.userRepository.save(user);

    return {
      user,
    };
  }
}
