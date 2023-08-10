export class InfrastructureException extends Error {
  constructor() {
    super("InfrastructureException");
    Object.setPrototypeOf(this, InfrastructureException.prototype);
  }
}

export class DomainException extends Error {
  constructor() {
    super("DomainException");
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}