export class User {
  private constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly department: string,
    public readonly image: string,
    public readonly createdAt: Date
  ) { }

  static create(
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    department: string,
    image: string,
    createdAt: string
  ) {
    return new User(
      id,
      username,
      firstname,
      lastname,
      department,
      image,
      new Date(createdAt)
    );
  }
}