export class UserAlreadyExistError extends Error {
  constructor() {
    super("Usuário já cadastrado.");
  }
}
