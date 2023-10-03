import { Task } from "../domain";
import { Status } from "../domain/task";
import { GetUserRepository, PatchTasksRepository } from "../infraestructure";

interface PatchTaskRequest {
  description?: string;
  status?: Status;
  title?: string;
  id: number;
  user_id?: number;
}
export class PatchTasksUseCase {
  async execute(props: PatchTaskRequest): Promise<Task[]> {
    const patchTasksRepository = new PatchTasksRepository();
    const getUserRepository = new GetUserRepository();
    const tasks = await patchTasksRepository.execute({ ...props });

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
