import { IAuthenticate } from "@/models/user-model";
import { UserRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials";
import { compare } from "bcrypt";

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: IAuthenticate) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
