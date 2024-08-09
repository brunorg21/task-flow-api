export class UserInSameOrganizationError extends Error {
  constructor() {
    super("Usuário já pertence à mesma organização.");
  }
}
