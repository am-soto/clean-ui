import { PostgrestError } from "@supabase/supabase-js";
import { DeleteTasksRepository } from "../infraestructure";

type DeleteInfoResponse = {
  success: boolean;
  message: string;
};

export class DeleteTasksUseCase {
  async execute(id: number): Promise<DeleteInfoResponse | null> {
    const deleteTasksRepository = new DeleteTasksRepository();
    try {
      await deleteTasksRepository.execute({ id });
      return { success: true, message: "OK" };
    } catch (error) {
      return { success: false, message: "Error" };
    }
  }
}
