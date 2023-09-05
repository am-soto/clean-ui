import { supabase } from "../../shared/supabaseClient";
import { HttpRepository } from "../../shared/httpFacade";
import { Status, Task } from "../../domain/task";
import {
  DomainException,
  InfrastructureException,
} from "../../shared/exception";
import { Database } from "../../types/supabase";
import { User } from "../../domain/user";

interface PostTaskRequest {
  color: string;
}

export class PostTasksRepository
  implements HttpRepository<PostTaskRequest, Task[]>
{
  async execute({ color }: PostTaskRequest): Promise<Task[]> {
    try {
      const { data } = await supabase
        .from("task")
        .insert([{ color, description: "", status: "todo", title: "" }])
        .select();
      return PostTaskDTO.fromJSON(data);
    } catch (error) {
      if (error instanceof DomainException) throw error;
      throw new PostTasksInfrastructureException();
    }
  }
}

export class PostTasksInfrastructureException extends InfrastructureException {}

class PostTaskDTO {
  static fromJSON(
    task: Database["public"]["Tables"]["task"]["Row"][] | null
  ): Task[] {
    if (task === null) return [];

    return task?.map((t) =>
      Task.create(
        t.id,
        t.title,
        t.description,
        t.status as Status,
        t.color,
        t.created_at ?? "",
        t.user_id ? User.create(t.user_id, "", "", "", "", "", "") : null
      )
    );
  }
}
