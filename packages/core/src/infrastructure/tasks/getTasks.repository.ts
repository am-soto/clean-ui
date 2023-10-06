import { Status, Task } from "../../domain/task";
import { HttpRepository } from "../../shared/httpFacade";
import { Database } from "../../types/supabase";
import {
  DomainException,
  InfrastructureException,
} from "../../shared/exception";
import { User } from "../../domain/user";
import { supabase } from "../../shared/supabaseClient";

export class GetTasksRepository implements HttpRepository<void, Task[]> {
  async execute(): Promise<Task[]> {
    try {
      const { data: tasks } = await supabase.from("task").select();
      return GetTaskDTO.fromJSON(tasks);
    } catch (error) {
      if (error instanceof DomainException) throw error;
      throw new GetTaskInfrastructureException();
    }
  }
}

class GetTaskInfrastructureException extends InfrastructureException { }

class GetTaskDTO {
  static fromJSON(
    data: Database["public"]["Tables"]["task"]["Row"][] | null
  ): Task[] {
    if (data === null) return [];

    return data?.map((t) =>
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
