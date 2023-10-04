import { User } from "./user";

export type Status = "todo" | "doing" | "done";

export class Task {
  private constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly status: Status,
    public readonly color: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly clientCode: string,
    public readonly user: User | null
  ) { }

  static create(
    id: number,
    title: string,
    description: string,
    status: Status,
    color: string,
    createdAt: string,
    updatedAt: string,
    clientCode: string,
    user: User | null
  ) {
    return new Task(
      id,
      title,
      description,
      status,
      color,
      createdAt === "" ? new Date() : new Date(createdAt),
      updatedAt === "" ? new Date() : new Date(updatedAt),
      clientCode,
      user
    );
  }
}
