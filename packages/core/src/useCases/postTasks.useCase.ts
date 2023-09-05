import { Task } from "../domain";
import {
  GetTasksRepository,
  GetUserRepository,
  PostTasksRepository,
} from "../infraestructure";

export class PostTasksUseCase {
  async execute(color: string): Promise<Task[]> {
    const postTasksRepository = new PostTasksRepository();
    const getUserRepository = new GetUserRepository();
    const tasks = await postTasksRepository.execute({
      color,
    });

    return Promise.all(
      tasks.map(async (t) => {
        return { ...t, user: await getUserRepository.execute(t.user?.id ?? 0) };
      })
    );
  }
}
