import { Task } from "../domain";
import {
  GetTasksRepository,
  GetUserRepository,
  PostTasksRepository,
} from "../infraestructure";

export class PostTasksUseCase {
  async execute(): Promise<Task[]> {
    const postTasksRepository = new PostTasksRepository();
    const getUserRepository = new GetUserRepository();
    const tasks = await postTasksRepository.execute({
      color: "",
      description: "",
      status: "",
      title: "",
    });

    return Promise.all(
      tasks.map(async (t) => {
        return { ...t, user: await getUserRepository.execute(t.user?.id ?? 0) };
      })
    );
  }
}
