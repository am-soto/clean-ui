import { HttpRepository } from "../../shared/httpFacade";
import { InfrastructureException } from "../../shared/exception";
import { supabase } from "../../shared/supabaseClient";

interface DeleteTaskRequest {
  id: number;
}

export class DeleteTasksRepository
  implements HttpRepository<DeleteTaskRequest, null>
{
  async execute({ id }: DeleteTaskRequest): Promise<null> {
    const { error } = await supabase.from("task").delete().eq("id", id);

    if (error) {
      throw new DeleteTaskInfrastructureException();
    }
    return null;
  }
}

class DeleteTaskInfrastructureException extends InfrastructureException {}
