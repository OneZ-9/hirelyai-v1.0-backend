class Unauthenticated extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Unauthenticated";
  }
}

export default Unauthenticated;
