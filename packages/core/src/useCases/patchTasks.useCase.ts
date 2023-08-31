import { Task } from "../domain";
import { GetUserRepository, PatchTasksRepository } from "../infraestructure";

export class PostTasksUseCase {
  async execute(): Promise<Task[]> {
    const patchTasksRepository = new PatchTasksRepository();
    const getUserRepository = new GetUserRepository();
    const tasks = await patchTasksRepository.execute({
      id: 0,
      color: "red",
      description: "description",
      status: "todo",
      title: "Title",
    });

    return Promise.all(
      tasks.map(async (t) => {
        return { ...t, user: await getUserRepository.execute(t.user?.id ?? 0) };
      })
    );
  }
}
