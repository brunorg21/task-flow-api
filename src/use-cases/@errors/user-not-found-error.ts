export class UserNotFoundError extends Error {
  constructor(email: string) {
    super(`Usuário com o e-mail ${email} não foi encontrado.`);
  }
}
