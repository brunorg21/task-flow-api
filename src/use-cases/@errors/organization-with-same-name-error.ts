export class OrganizationWithSameNameError extends Error {
  constructor() {
    super("Organização com o nome informado já existe!");
  }
}
