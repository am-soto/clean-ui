import { supabase } from "../../shared/supabaseClient";
import { HttpRepository } from "../../shared/httpFacade";
import { Status, Task } from "../../domain/task";
import {
  DomainException,
  InfrastructureException,
} from "../../shared/exception";
import { Database } from "../../types/supabase";
import { User } from "../../domain/user";

interface PatchTaskRequest {
  description?: string;
  status?: string;
  title?: string;
  id: number;
  user_id?: number;
  last_client_code: string;
}

export class PatchTasksRepository
  implements HttpRepository<PatchTaskRequest, Task[]>
{
  async execute(props: PatchTaskRequest): Promise<Task[]> {
    try {
      const { data } = await supabase
        .from("task")
        .update({ ...props })
        .eq("id", props.id)
        .select();

      return PatchTaskDTO.fromJSON(data);
    } catch (error) {
      if (error instanceof DomainException) throw error;
      throw new PatchTasksInfrastructureException();
    }
  }
}

export class PatchTasksInfrastructureException extends InfrastructureException { }

class PatchTaskDTO {
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
        t.updated_at ?? "",
        t.last_client_code ?? "",
        t.user_id ? User.create(t.user_id, "", "", "", "", "", "") : null
      )
    );
  }
}
