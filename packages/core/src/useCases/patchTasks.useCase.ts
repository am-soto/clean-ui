import { Task } from "../domain";
import { Status } from "../domain/task";
import { GetUserRepository, PatchTasksRepository } from "../infraestructure";

interface PatchTaskRequest {
  description?: string;
  status?: Status;
  title?: string;
  id: number;
  user_id?: number;
  clientCode: string;
}
export class PatchTasksUseCase {
  async execute({ description, status, title, id, user_id, clientCode }: PatchTaskRequest): Promise<Task[]> {
    const patchTasksRepository = new PatchTasksRepository();
    const getUserRepository = new GetUserRepository();
    const tasks = await patchTasksRepository.execute({
      description,
      status,
      title,
      id,
      user_id,
      last_client_code: clientCode,
    });

    return Promise.all(
      tasks.map(async (t) => {
        let user = null;
        if (t.user?.id !== undefined) {
          user = await getUserRepository.execute(t.user.id);
        }
        return { ...t, user }
      })
    );
  }
}
