import { HttpRepository } from "../../shared/httpFacade";
import {
  DomainException,
  InfrastructureException,
} from "../../shared/exception";
import { supabase } from "../../shared/supabaseClient";
import { PostgrestError } from "@supabase/supabase-js";

// TODO: mover
interface DeleteTaskRequest {
  id: string;
}

export class DeleteTasksRepository
  implements HttpRepository<DeleteTaskRequest, PostgrestError | null>
{
  async execute(id: DeleteTaskRequest): Promise<PostgrestError | null> {
    try {
      const { error } = await supabase.from("task").delete().eq("id", id);
      return error;
    } catch (error) {
      if (error instanceof DomainException) throw error;
      throw new DeleteTaskInfrastructureException();
    }
  }
}

class DeleteTaskInfrastructureException extends InfrastructureException {}
