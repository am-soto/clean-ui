import { Task } from "../domain";
import { GetUserRepository, PostTasksRepository } from "../infrastructure";

export class PostTasksUseCase {
  async execute(color: string, clientCode: string): Promise<Task[]> {
    const postTasksRepository = new PostTasksRepository();
    const getUserRepository = new GetUserRepository();
    const tasks = await postTasksRepository.execute({
      color,
      last_client_code: clientCode,
    });

    return Promise.all(
      tasks.map(async (t) => {
        let user = null;
        if (t.user?.id !== undefined) {
          user = await getUserRepository.execute(t.user.id);
        }
        return { ...t, user };
      })
    );
  }
}
