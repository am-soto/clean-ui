import { Task } from "../domain";
import { GetTasksRepository, GetUserRepository } from "../infraestructure";

export class GetTasksUseCase {
    async execute(): Promise<Task[]> {
        const getTasksRepository = new GetTasksRepository();
        const getUserRepository = new GetUserRepository();
        const tasks = await getTasksRepository.execute();

        return Promise.all(tasks.map(async (t) => {
            let user = null;
            if (t.user?.id !== undefined) {
                user = await getUserRepository.execute(t.user.id);
            }
            return { ...t, user }
        }));
    }
}