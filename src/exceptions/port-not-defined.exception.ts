export class PortNotDefinedException extends Error {
  constructor() {
    super('PORT is not defined. Please set PORT in environment variables.');
    this.name = PortNotDefinedException.name;
  }
}
