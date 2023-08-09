import { DomainException } from "../shared/exception";
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
    public readonly user: User | null
  ) { }

  static create(
    id: number,
    title: string,
    description: string,
    status: Status,
    color: string,
    createdAt: string,
    user: User | null
  ) {
    if (title.length === 0) throw new DomainException();

    return new Task(
      id,
      title,
      description,
      status,
      color,
      createdAt === "" ? new Date() : new Date(createdAt),
      user
    );
  }
}