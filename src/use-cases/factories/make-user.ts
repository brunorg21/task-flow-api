import { UserRepository } from "@/repositories/user-repository";
import { hash } from "bcrypt";

export async function makeUser(userRepository: UserRepository) {
  const user = await userRepository.create({
    email: "bruno@email.com",
    password: await hash("12345", 6),
    username: "Bruno",
  });

  return user;
}
