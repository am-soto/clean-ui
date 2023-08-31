import { PostgrestError } from "@supabase/supabase-js";
import { DeleteTasksRepository } from "../infraestructure";

export class PostTasksUseCase {
  async execute(): Promise<PostgrestError | null> {
    const postTasksRepository = new DeleteTasksRepository();
    const tasks = await postTasksRepository.execute({ id: "0" });
    return tasks;
  }
}
