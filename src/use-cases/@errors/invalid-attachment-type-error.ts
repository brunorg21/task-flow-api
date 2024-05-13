export class InvalidAttachmentTypeError extends Error {
  constructor(type: string) {
    super(`O tipo ${type} não é válido.`);
  }
}
